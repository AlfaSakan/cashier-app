export const SECOND_IN_MILLISECOND = 1000;
export const MINUTES_IN_SECOND = 60;
export const HOURS_IN_SECOND = 60 * MINUTES_IN_SECOND;
export const DAYS_IN_SECOND = 24 * HOURS_IN_SECOND;

export const MONTHS = [
	'Januari',
	'Februari',
	'Maret',
	'April',
	'Mei',
	'Juni',
	'Juli',
	'Agustus',
	'September',
	'Oktober',
	'November',
	'Desember'
];

export function generateUnixSecond() {
	return Math.round(new Date().getTime() / 1000);
}

export function formatUnixToDate(second: number) {
	const date = new Date(second * 1000);
	return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export function isToday(second: number) {
	const now = new Date();

	return new Date(second * 1000).getDate() === now.getDate();
}

export function isYesterday(second: number) {
	const now = new Date();

	return new Date(second * 1000).getDate() === now.getDate() - 1;
}

export function getLabelDate(second: number) {
	if (isToday(second)) return 'Hari ini';
	if (isYesterday(second)) return 'Kemarin';

	return formatUnixToDate(second);
}
