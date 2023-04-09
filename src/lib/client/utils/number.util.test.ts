import { describe, expect, it } from 'vitest';
import { bigIntHandling, formatNumberToRupiah, generateTicks } from './number.util';

describe('formatNumberToRupiah', () => {
	it('should return Rp 1.000,00', () => {
		const value = formatNumberToRupiah(1000);

		expect(value).toBe('Rp\u{00A0}1.000');
	});
});

describe('bigIntHandling', () => {
	it('should convert bigInt to number', () => {
		const value = bigIntHandling(BigInt(100));

		expect(typeof value).toBe('number');
	});

	it('should not convert string to number', () => {
		const value = bigIntHandling('1000');

		expect(typeof value).not.toBe('number');
	});
});

describe('generateTicks', () => {
	it('should be able generate ticks for data chart', () => {
		expect(generateTicks([{ x: 0, y: 100 }])).toEqual({
			yTicks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
			xTicks: [0]
		});
	});
});
