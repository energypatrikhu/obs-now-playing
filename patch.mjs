import { cpSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dirsToCopy = { '../obs-now-playing-extension/build': 'extension' };

for (const key in dirsToCopy) {
	cpSync(resolve(key), resolve(join('pkg', dirsToCopy[key])), {
		recursive: true,
	});
}
