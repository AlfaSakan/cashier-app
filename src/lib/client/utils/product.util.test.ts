import type { Product } from '@prisma/client';
import { describe, expect, it } from 'vitest';
import { formatNumberToRupiah } from './number.util';
import { countProductsAmount, countTotalProductsPrice } from './product.util';

const productMock: Product = {
	amount: 1,
	createdAt: 0,
	updatedAt: 0,
	description: 'description',
	id: 'id1',
	name: 'name',
	price: 1000,
	unit: 'unit',
	userId: 'user-id'
};

describe('countProductsAmount', () => {
	it('should be able to count product', () => {
		expect(countProductsAmount([productMock, productMock])).toBe(2);
	});
});

describe('countTotalProductsPrice', () => {
	it('should be able to count total price', () => {
		expect(countTotalProductsPrice([productMock, productMock])).toBe(formatNumberToRupiah(2000));
	});
});
