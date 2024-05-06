"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const youtube_dl_exec_1 = require("youtube-dl-exec");
const node_path_1 = require("node:path");
async function ytdl(url, flags, options) {
    console.log(__dirname);
    const youtubeDl = (0, youtube_dl_exec_1.create)((0, node_path_1.join)(__dirname, '../../node_modules/youtube-dl-exec/bin/yt-dlp.exe'));
    return (await youtubeDl(url, flags, options));
}
exports.default = ytdl;
