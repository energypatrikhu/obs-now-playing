import type { Server } from 'socket.io';
import type YtPlaying from './YtPlaying';

declare global {
	namespace Express {
		interface Locals {
			io: Server;
			ytPlayingCurrent: YtPlaying;
			ytPlayingNext: YtPlaying;
		}
	}
}
