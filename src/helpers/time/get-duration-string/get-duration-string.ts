import prettyMilliseconds from 'pretty-ms';
import toMilliseconds from '@sindresorhus/to-milliseconds';

export function getDurationString(duration: number, isShort = false) {
  const millisecond = toMilliseconds({ minutes: duration });

  return prettyMilliseconds(millisecond, { unitCount: 2, verbose: !isShort });
}
