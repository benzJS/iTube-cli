export function duration(time) {
	return time ? time.replace(/[M S PT]/g, match => match === 'M' ? ':' : '') : '';
}