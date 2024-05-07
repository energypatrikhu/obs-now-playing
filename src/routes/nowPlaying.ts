import { Router } from 'express';
import moment from 'moment';
import type Metadata from '../_types/Metadata';

const router = Router();

router.post('/nowPlaying', async (req, res) => {
	const { metadata, time } = req.body as {
		metadata?: Metadata;
		time?: number;
	};

	if (!metadata) {
		return res.status(400).json({
			error: 'No metadata provided',
		});
	}

	if (!time) {
		return res.status(400).json({
			error: 'No time provided',
		});
	}

	const duration = metadata.duration - (24 + 13.2);
	const reAlerts = [
		moment(time).unix() * 1000,
		moment(time).add(duration, 'seconds').unix() * 1000,
	];

	req.app.locals.ytPlayingNext = {
		reAlerts,
		track: metadata.title || metadata.album || 'Unknown',
		artist: metadata.artist || 'Unknown',
		thumbnail:
			metadata.artwork ||
			'data:image/png;base64,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',
	};

	if (
		JSON.stringify(req.app.locals.ytPlayingCurrent) !==
		JSON.stringify(req.app.locals.ytPlayingNext)
	) {
		req.app.locals.ytPlayingCurrent = req.app.locals.ytPlayingNext;
		req.app.locals.io.emit('nowPlaying', req.app.locals.ytPlayingCurrent);
	}

	return res.sendStatus(202);
});

router.get('/nowPlaying', async (req, res) => {
	return res.status(200).json(req.app.locals.ytPlayingCurrent);
});

export default router;
