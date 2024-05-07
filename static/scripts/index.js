(async () => {
	const qS = (selectors) => document.querySelector(selectors);

	/**
	 * @type {HTMLDivElement | null}
	 */
	const HTML__nowPlaying = qS('#nowPlaying');
	/**
	 * @type {HTMLSpanElement | null}
	 */
	const HTML__artist = qS('#artist');
	/**
	 * @type {HTMLSpanElement | null}
	 */
	const HTML__track = qS('#track');
	/**
	 * @type {HTMLImageElement | null}
	 */
	const HTML__thumbnail = qS('#thumbnail');

	if (
		!HTML__nowPlaying ||
		!HTML__artist ||
		!HTML__track ||
		!HTML__thumbnail
	) {
		return;
	}

	// @ts-ignore
	const socket = new io();

	// seconds
	const animDelay = 3.2;
	const showTime = 24;

	let _addPulse, _removePulse, _close;
	const _reAlerts = [];

	let _data = {};

	socket.on('nowPlaying', (data) => {
		if (_data != data) {
			clearTimeout(_addPulse);
			clearTimeout(_removePulse);
			clearTimeout(_close);
			for (const reAlert of _reAlerts) {
				clearTimeout(reAlert);
			}

			HTML__artist.textContent = data.artist;
			HTML__track.textContent = data.track;
			HTML__thumbnail.src = data.thumbnail;

			_data = data;

			for (const reAlert of data.reAlerts) {
				// @ts-ignore
				const timeout = new Date(reAlert) - new Date();
				_reAlerts.push(setTimeout(_alert, timeout));
			}
		}
	});

	function _alert() {
		HTML__nowPlaying?.setAttribute('data-open', 'true');

		_addPulse = setTimeout(() => {
			HTML__nowPlaying?.classList.add('enablePulse');
			_removePulse = setTimeout(() => {
				HTML__nowPlaying?.classList.remove('enablePulse');
			}, showTime * 1000);
		}, animDelay * 1000);

		_close = setTimeout(() => {
			HTML__nowPlaying?.setAttribute('data-open', 'false');
		}, (showTime + animDelay) * 1000);
	}
})();
