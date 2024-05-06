import { copyFileSync, cpSync, mkdirSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';

const filesToCopy = ['youtube-dl-exec/bin/yt-dlp.exe'];

mkdirSync(join('pkg', 'utils'), { recursive: true });
for (const file of filesToCopy) {
	copyFileSync(
		resolve(join('node_modules', file)),
		resolve(join('pkg', 'utils', basename(file))),
	);
}

const dirsToCopy = { '../obs-now-playing-extension/build': 'extension' };

for (const key in dirsToCopy) {
	cpSync(resolve(key), resolve(join('pkg', dirsToCopy[key])), {
		recursive: true,
	});
}
