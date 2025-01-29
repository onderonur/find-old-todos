import dayjs from 'dayjs';
// Since we have `"type": "module"` in package.json, we need to add file extension for `relativeTime`.
// Otherwise, it throws when the package is bundled and ran.
import relativeTime from 'dayjs/plugin/relativeTime.js';

dayjs.extend(relativeTime);

export { dayjs };
