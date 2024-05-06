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

	let _addPulse, _removePulse, _close, _reAlert;

	let _data = {};

	socket.on('nowPlaying', (data) => {
		if (_data != data) {
			HTML__artist.innerText = data.artist;
			HTML__track.innerText = data.track;
			HTML__thumbnail.src = data.thumbnail;

			_data = data;

			_alert();
			// @ts-ignore
			_reAlert = setTimeout(_alert, new Date(data.reAlert) - new Date());
		}
	});

	function _alert() {
		HTML__nowPlaying?.setAttribute('data-open', 'true');

		clearTimeout(_addPulse);
		clearTimeout(_removePulse);
		clearTimeout(_close);
		clearTimeout(_reAlert);

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
