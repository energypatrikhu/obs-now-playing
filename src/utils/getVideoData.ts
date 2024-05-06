import { Thumbnail, type Flags } from 'youtube-dl-exec';
import generateUserAgent from './generateUserAgent';
import ytdl from './ytdl';

const splitters = [' - ', ': ', ' – '];
const artistSplitterFillers = [' x ', ' & ', ', '];

const prefixes = {
	ytm: 'https://music.youtube.com/watch?v=',
	yt: 'https://www.youtube.com/watch?v=',
};

function coreSplitter(stringArray: Array<string>, stringSplitter: any) {
	const splittedStrings = [];
	for (const _string of stringArray) {
		splittedStrings.push(..._string.split(stringSplitter));
	}
	return splittedStrings;
}

function splitText(string: string, splitters: Array<any>) {
	let splittedString = [string];
	for (const _splitter of splitters) {
		const tmpSplittedString = [];
		for (const _coreSplitted of coreSplitter(splittedString, _splitter)) {
			tmpSplittedString.push(_coreSplitted);
		}

		splittedString = tmpSplittedString;
	}

	return splittedString;
}

function getThumbnail(thumbnails: Thumbnail[], fallback: string) {
	let largestThumbnail: Thumbnail | undefined;

	for (const thumbnail of thumbnails) {
		if (
			thumbnail.height !== undefined &&
			thumbnail.width !== undefined &&
			thumbnail.height === thumbnail.width &&
			(largestThumbnail === undefined ||
				largestThumbnail.height! < thumbnail.height)
		) {
			largestThumbnail = thumbnail;
		}
	}

	return largestThumbnail?.url ?? fallback;
}

export default async function getVideoData(
	videoId: string,
	forceReferer?: string,
) {
	try {
		const referer = (forceReferer ?? prefixes.ytm) + videoId;

		const infoYtdlOptions: Flags = {
			dumpSingleJson: true,
			callHome: false,
			noCheckCertificates: true,
			noPlaylist: true,
			noWarnings: true,
			userAgent: generateUserAgent(),
			youtubeSkipDashManifest: true,
		};

		let {
			title,
			channel,
			artist,
			creator,
			track,
			album,
			thumbnails,
			thumbnail,
			duration,
		} = await ytdl(referer, { ...infoYtdlOptions, referer });

		const splitter = splitters.find((_splitter) =>
			title.includes(_splitter),
		);

		[artist, track] =
			!artist && splitter
				? title.split(splitter)
				: [artist || creator || channel, track || album || title];

		if (artist) {
			const modifiedArtist = [];
			const artists = [
				...new Set(splitText(artist, artistSplitterFillers)),
			].sort() as Array<string>;
			for (const _artist of artists) {
				if (
					!(track ?? '')
						.toLowerCase()
						.includes((_artist ?? '').toLowerCase())
				) {
					modifiedArtist.push(_artist);
				}
			}
			artist = modifiedArtist.join(', ') || channel;
		}

		return {
			artist,
			track,
			thumbnail: getThumbnail(thumbnails, thumbnail),
			duration,
		};
	} catch {
		if (prefixes.yt === forceReferer) {
			return null;
		}
		return await getVideoData(videoId, prefixes.yt);
	}
}
