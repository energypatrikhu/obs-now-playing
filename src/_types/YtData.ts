export default interface YtData {
	id: string;
	title: string;
	formats: Format[];
	thumbnails: Thumbnail[];
	thumbnail: string;
	description: string;
	uploader: string;
	uploader_id: string;
	uploader_url: string;
	channel_id: string;
	channel_url: string;
	duration: number;
	view_count: number;
	average_rating: null;
	age_limit: number;
	webpage_url: string;
	categories: string[];
	tags: string[];
	playable_in_embed: boolean;
	live_status: null;
	release_timestamp: null;
	automatic_captions: AutomaticCaptions;
	subtitles: AutomaticCaptions;
	album: string;
	artist: string;
	track: string;
	release_date: null;
	release_year: number;
	comment_count: null;
	chapters: null;
	like_count: number;
	channel: string;
	channel_follower_count: number;
	upload_date: string;
	creator: string;
	alt_title: string;
	availability: string;
	original_url: string;
	webpage_url_basename: string;
	webpage_url_domain: string;
	extractor: string;
	extractor_key: string;
	playlist: null;
	playlist_index: null;
	display_id: string;
	fulltitle: string;
	duration_string: string;
	requested_subtitles: null;
	_has_drm: null;
	requested_downloads: RequestedDownload[];
	requested_formats: Format[];
	format: string;
	format_id: string;
	ext: string;
	protocol: string;
	language: null;
	format_note: string;
	filesize_approx: number;
	tbr: number;
	width: number;
	height: number;
	resolution: string;
	fps: number;
	dynamic_range: string;
	vcodec: string;
	vbr: number;
	stretched_ratio: null;
	acodec: string;
	abr: number;
	asr: number;
	audio_channels: number;
	epoch: number;
	_type: string;
	_version: Version;
}

export interface Version {
	version: string;
	current_git_head: null;
	release_git_head: string;
	repository: string;
}

export interface AutomaticCaptions {}

export interface Format {
	format_id: string;
	format_note: string;
	ext: string;
	protocol: string;
	acodec: string;
	vcodec: string;
	url: string;
	width: number | null;
	height: number | null;
	fps: number | null;
	rows?: number;
	columns?: number;
	fragments?: Fragment[];
	audio_ext: string;
	video_ext: string;
	format: string;
	resolution: string;
	http_headers: HTTPHeaders;
	asr?: number | null;
	filesize?: number | null;
	source_preference?: number;
	audio_channels?: number | null;
	quality?: number;
	has_drm?: boolean;
	tbr?: number;
	language?: string;
	language_preference?: number;
	preference?: number | null;
	dynamic_range?: string | null;
	abr?: number;
	downloader_options?: DownloaderOptions;
	container?: string;
	vbr?: number;
	filesize_approx?: number;
}

export interface DownloaderOptions {
	http_chunk_size: number;
}

export interface Fragment {
	url: string;
	duration: number;
}

export interface HTTPHeaders {
	'User-Agent': string;
	'Accept': string;
	'Accept-Language': string;
	'Sec-Fetch-Mode': string;
	'Referer': string;
}

export interface RequestedDownload {
	requested_formats: Format[];
	format: string;
	format_id: string;
	ext: string;
	protocol: string;
	format_note: string;
	filesize_approx: number;
	tbr: number;
	width: number;
	height: number;
	resolution: string;
	fps: number;
	dynamic_range: string;
	vcodec: string;
	vbr: number;
	acodec: string;
	abr: number;
	asr: number;
	audio_channels: number;
	epoch: number;
	_filename: string;
	__write_download_archive: boolean;
}

export interface Thumbnail {
	url: string;
	height?: number;
	width?: number;
	preference: number;
	id: string;
	resolution?: string;
}
