import { Router } from 'express';
import getVideoData from '../utils/getVideoData';
import moment from 'moment';

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

	const duration = videoData.duration - 40;
	const reAlerts = [
		moment(time).unix() * 1000,
		moment(time).add(duration, 'seconds').unix() * 1000,
	];

	req.app.locals.ytPlayingNext = {
		reAlerts,
		track: videoData.track,
		artist: videoData.artist,
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
