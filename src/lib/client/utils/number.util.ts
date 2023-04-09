import type { ChartType } from './types.util';

export function formatNumberToRupiah(numb: number) {
	return new Intl.NumberFormat('id-ID', {
		currency: 'IDR',
		style: 'currency'
	})
		.format(numb)
		.replace(',00', '');
}

export function bigIntHandling<T>(obj: T): T {
	return JSON.parse(
		JSON.stringify(obj, (_, value) => (typeof value === 'bigint' ? Number(value) : value))
	);
}

export function generateTicks(data: ChartType[]) {
	const y = data.map((d) => d.y);
	const maxY = Math.max.apply(null, y);
	const delta = Math.round(maxY / 10);

	const yTicks = [...Array(11)].map((_, index) => index * delta);
	const xTicks = data.map((d) => d.x);

	return { yTicks, xTicks };
}
