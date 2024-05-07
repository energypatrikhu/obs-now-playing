import { SpawnOptions } from 'child_process';
import { create as createYoutubeDl, type Flags } from 'youtube-dl-exec';
import type YtData from '../_types/YtData';

export default async function ytdl(
	url: string,
	flags?: Flags | undefined,
	options?: SpawnOptions | undefined,
): Promise<YtData> {
	const youtubeDlExec = createYoutubeDl('./utils/yt-dlp.exe');
	return youtubeDlExec(url, flags, options) as any;
}
