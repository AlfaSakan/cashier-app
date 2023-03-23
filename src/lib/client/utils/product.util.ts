import type { Product } from '@prisma/client';
import { formatNumberToRupiah } from './number.util';

export function countProductsAmount(products: Product[]) {
	return products.reduce((prev, curr) => prev + curr.amount, 0);
}

export function countTotalProductsPrice(products: Product[]) {
	return formatNumberToRupiah(products.reduce((prev, curr) => prev + curr.price * curr.amount, 0));
}
