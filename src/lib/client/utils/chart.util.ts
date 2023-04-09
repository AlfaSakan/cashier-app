import { DAYS_IN_SECOND } from './date.util';
import type { ChartType, Transaction } from './types.util';

export function convertTransactionToChart(data: Transaction[]): ChartType[] {
	const mappingData = new Map<number, number>();

	data.forEach((d) => {
		const x = d.createdAt - (d.createdAt % DAYS_IN_SECOND);
		const y =
			d.TransactionProduct.reduce((prev, curr) => prev + curr.productSold * curr.currentPrice, 0) /
			1000;

		if (mappingData.has(x)) {
			mappingData.set(x, (mappingData.get(x) || 0) + y);
			return;
		}

		mappingData.set(x, y);
	});

	return Array.from(mappingData)
		.map(([key, value]) => ({ x: key, y: value }))
		.sort((a, b) => a.x - b.x);
}
