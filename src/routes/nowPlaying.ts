import { Router } from 'express';
import getVideoData from '../utils/getVideoData';

const router = Router();

router.post('/nowPlaying', async (req, res) => {
	const { videoId, time } = req.body as {
		videoId?: string;
		time?: number;
	};

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

	const videoData = await getVideoData(videoId);

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

	if (
		JSON.stringify(req.app.locals.ytPlayingCurrent) !==
		JSON.stringify(req.app.locals.ytPlayingNext)
	) {
		req.app.locals.ytPlayingCurrent = req.app.locals.ytPlayingNext;
		io.emit('nowPlaying', req.app.locals.ytPlayingCurrent);
	}

	return res.sendStatus(202);
});

router.get('/nowPlaying', async (req, res) => {
	return res.status(200).json(req.app.locals.ytPlayingCurrent);
});

export default router;
