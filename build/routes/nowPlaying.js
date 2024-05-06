"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getVideoData_1 = __importDefault(require("../utils/getVideoData"));
const router = (0, express_1.Router)();
router.post('/nowPlaying', async (req, res) => {
    const { videoId, time } = req.body;
    if (!videoId) {
        return res.status(400).json({
            error: 'No videoId provided',
        });
    }
    if (!time) {
        return res.status(400).json({
            error: 'No time provided',
        });
    }
    const { io } = req.app.locals;
    if (io.engine.clientsCount === 0) {
        return res.status(400).json({
            error: 'No clients connected',
        });
    }
    const videoData = await (0, getVideoData_1.default)(videoId);
    if (!videoData) {
        return res.status(400).json({
            error: 'Invalid videoId',
        });
    }
    req.app.locals.ytPlayingNext = {
        reAlert: time,
        artist: videoData.artist,
        track: videoData.track,
        thumbnail: videoData.thumbnail,
    };
    if (JSON.stringify(req.app.locals.ytPlayingCurrent) !==
        JSON.stringify(req.app.locals.ytPlayingNext)) {
        req.app.locals.ytPlayingCurrent = req.app.locals.ytPlayingNext;
        io.emit('nowPlaying', req.app.locals.ytPlayingCurrent);
    }
    return res.sendStatus(202);
});
router.get('/nowPlaying', async (req, res) => {
    return res.status(200).json(req.app.locals.ytPlayingCurrent);
});
exports.default = router;
