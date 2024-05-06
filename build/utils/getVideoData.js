"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateUserAgent_1 = __importDefault(require("./generateUserAgent"));
const ytdl_1 = __importDefault(require("./ytdl"));
const splitters = [' - ', ': ', ' – '];
const artistSplitterFillers = [' x ', ' & ', ', '];
const prefixes = {
    ytm: 'https://music.youtube.com/watch?v=',
    yt: 'https://www.youtube.com/watch?v=',
};
function coreSplitter(stringArray, stringSplitter) {
    const splittedStrings = [];
    for (const _string of stringArray) {
        splittedStrings.push(..._string.split(stringSplitter));
    }
    return splittedStrings;
}
function splitText(string, splitters) {
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
function getThumbnail(thumbnails, fallback) {
    let largestThumbnail;
    for (const thumbnail of thumbnails) {
        if (thumbnail.height !== undefined &&
            thumbnail.width !== undefined &&
            thumbnail.height === thumbnail.width &&
            (largestThumbnail === undefined ||
                largestThumbnail.height < thumbnail.height)) {
            largestThumbnail = thumbnail;
        }
    }
    return largestThumbnail?.url ?? fallback;
}
async function getVideoData(videoId, forceReferer) {
    try {
        const referer = (forceReferer ?? prefixes.ytm) + videoId;
        const infoYtdlOptions = {
            dumpSingleJson: true,
            callHome: false,
            noCheckCertificates: true,
            noPlaylist: true,
            noWarnings: true,
            userAgent: (0, generateUserAgent_1.default)(),
            youtubeSkipDashManifest: true,
        };
        const videoInfo = await (0, ytdl_1.default)(referer, { ...infoYtdlOptions, referer });
        console.log(videoInfo);
        let { title, channel, artist, creator, track, album, thumbnails, thumbnail, } = videoInfo;
        const splitter = splitters.find((_splitter) => title.includes(_splitter));
        [artist, track] =
            !artist && splitter
                ? title.split(splitter)
                : [artist || creator || channel, track || album || title];
        if (artist) {
            const modifiedArtist = [];
            const artists = [
                ...new Set(splitText(artist, artistSplitterFillers)),
            ].sort();
            for (const _artist of artists) {
                if (!(track ?? '')
                    .toLowerCase()
                    .includes((_artist ?? '').toLowerCase())) {
                    modifiedArtist.push(_artist);
                }
            }
            artist = modifiedArtist.join(', ') || channel;
        }
        return {
            artist,
            track,
            thumbnail: getThumbnail(thumbnails, thumbnail),
        };
    }
    catch (error) {
        console.log(error);
        if (prefixes.yt === forceReferer) {
            return null;
        }
        return await getVideoData(videoId, prefixes.yt);
    }
}
exports.default = getVideoData;
