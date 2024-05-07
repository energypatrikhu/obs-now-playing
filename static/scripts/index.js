(async () => {
	/**
	 * @type {HTMLDivElement | null}
	 */
	const HTML__nowPlaying = document.querySelector('#nowPlaying');
	/**
	 * @type {HTMLSpanElement | null}
	 */
	const HTML__artist = document.querySelector('#artist');
	/**
	 * @type {HTMLSpanElement | null}
	 */
	const HTML__track = document.querySelector('#track');
	/**
	 * @type {HTMLImageElement | null}
	 */
	const HTML__thumbnail = document.querySelector('#thumbnail');

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
	const showTime = 16;

	let _addPulse, _removePulse, _close;
	const _reAlerts = [];

	let _data = {};

	socket.on('nowPlaying', (data) => {
		if (_data != data) {
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
		console.time('alert');
		HTML__nowPlaying?.setAttribute('data-open', 'true');

		clearTimeout(_addPulse);
		clearTimeout(_removePulse);
		clearTimeout(_close);
		for (const reAlert of _reAlerts) {
			clearTimeout(reAlert);
		}

		_addPulse = setTimeout(() => {
			HTML__nowPlaying?.classList.add('enablePulse');
			_removePulse = setTimeout(() => {
				HTML__nowPlaying?.classList.remove('enablePulse');
			}, showTime * 1000);
		}, animDelay * 1000);

		_close = setTimeout(() => {
			HTML__nowPlaying?.setAttribute('data-open', 'false');
			console.timeEnd('alert');
		}, (showTime + animDelay) * 1000);
	}
})();
