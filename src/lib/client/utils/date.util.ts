import { format as f, isToday } from 'date-fns';
import id from 'date-fns/locale/id/index';

export const SECOND_IN_MILLISECOND = 1000;
export const MINUTES_IN_SECOND = 60;
export const HOURS_IN_SECOND = 60 * MINUTES_IN_SECOND;
export const DAYS_IN_SECOND = 24 * HOURS_IN_SECOND;

export function generateUnixSecond(): number {
	return Math.round(new Date().getTime() / 1000);
}

export function generateNext7Days(): Date {
	const now = new Date();
	return new Date(now.getTime() + 7 * DAYS_IN_SECOND);
}

export function format(second: number, format: string) {
	return f(second * 1000, format, { locale: id });
}

export function getLabelDate(second: number) {
	const ms = second * 1000;

	if (isToday(ms)) return format(second, 'HH:mm');

	return format(second, 'dd MMMM yyyy');
}

export function convertToDateValue(second: number) {
	const ms = second * 1000;

	return new Date(ms).toISOString().substring(0, 10);
}
