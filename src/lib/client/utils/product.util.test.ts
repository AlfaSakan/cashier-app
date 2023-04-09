import { productMock, productMock2 } from '$lib/__mocks__/dummy/product.dummy';
import { describe, expect, it } from 'vitest';
import { formatNumberToRupiah } from './number.util';
import { countProductsAmount, countTotalProductsPrice } from './product.util';

describe('countProductsAmount', () => {
	it('should be able to count product', () => {
		expect(countProductsAmount([productMock, productMock2])).toBe(30);
	});
});

describe('countTotalProductsPrice', () => {
	it('should be able to count total price', () => {
		expect(countTotalProductsPrice([productMock, productMock2])).toBe(formatNumberToRupiah(50000));
	});
});
