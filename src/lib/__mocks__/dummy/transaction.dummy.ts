import type { TransactionHistory, TransactionProduct } from '@prisma/client';
import { productMock } from './product.dummy';
import { userId } from './user.dummy';

export const transactionHistoryId = 'transactio-id';
export const transactionProductId = 'transactio-product-id';

export const transactionHistoryMock: TransactionHistory = {
	createdAt: 0,
	moneyPaid: 100000,
	id: transactionHistoryId,
	userId: userId
};

export const transactionProductMock: TransactionProduct = {
	id: transactionProductId,
	productId: productMock.id,
	productSold: 10,
	transactionHistoryId,
	currentPrice: 10000
};
