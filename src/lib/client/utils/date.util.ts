import { format as f, isToday } from 'date-fns';

export const SECOND_IN_MILLISECOND = 1000;
export const MINUTES_IN_SECOND = 60;
export const HOURS_IN_SECOND = 60 * MINUTES_IN_SECOND;
export const DAYS_IN_SECOND = 24 * HOURS_IN_SECOND;

export function generateUnixSecond() {
	return Math.round(new Date().getTime() / 1000);
}

export function format(second: number, format: string) {
	return f(second * 1000, format, { locale: { code: 'id-ID' } });
}

export function getLabelDate(second: number) {
	const ms = second * 1000;

	if (isToday(ms)) return format(second, 'HH:mm');

	return format(second, 'dd MMMM yyyy');
}
