import { productMock } from '$lib/__mocks__/dummy/product.dummy';
import {
	transactionHistoryMock,
	transactionProductMock
} from '$lib/__mocks__/dummy/transaction.dummy';
import { userId } from '$lib/__mocks__/dummy/user.dummy';
import prismaMock from '$lib/__mocks__/prisma';
import { errorMessages } from '$lib/client/constants/error.constant';
import type { TransactionHistory, TransactionProduct } from '@prisma/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TransactionService } from './transation.service';

afterEach(() => {
	vi.clearAllMocks();
});

describe('TransactionService', () => {
	const transactionService = new TransactionService();

	const expectData: TransactionHistory & { TransactionProduct: TransactionProduct[] } = {
		...transactionHistoryMock,
		TransactionProduct: [transactionProductMock]
	};

	describe('createTransaction', () => {
		it('should be able to create transaction', async () => {
			prismaMock.transactionHistory.create.mockResolvedValueOnce(transactionHistoryMock);
			prismaMock.transactionProduct.createMany.mockResolvedValueOnce({ count: 1 });

			const spyOn = vi.spyOn(transactionService, 'findTransactionById');
			spyOn.mockResolvedValueOnce({ error: null, transactions: expectData });

			const results = await transactionService.createTransaction({
				products: [productMock],
				userId: userId
			});

			expect(results).toEqual({ error: null, transactions: expectData });
		});
	});

	describe('checkPermission', () => {
		it('should be able to check permission for transaction', async () => {
			const spyOn = vi.spyOn(transactionService, 'findTransactionById');
			spyOn.mockResolvedValueOnce({ error: null, transactions: expectData });

			const results = await transactionService.checkPermission({
				userId: userId,
				transactionId: transactionHistoryMock.id
			});

			expect(results).toEqual({ error: null, transactions: expectData });
		});

		it('should return error forbidden message', async () => {
			const spyOn = vi.spyOn(transactionService, 'findTransactionById');
			spyOn.mockResolvedValueOnce({ error: null, transactions: expectData });

			const results = await transactionService.checkPermission({
				userId: 'wrong-id',
				transactionId: transactionHistoryMock.id
			});

			expect(results).toEqual({ error: errorMessages.forbidden, transactions: null });
		});

		it('should return error transaction not foun', async () => {
			const spyOn = vi.spyOn(transactionService, 'findTransactionById');
			spyOn.mockResolvedValueOnce({
				error: errorMessages['transaction-not-found'],
				transactions: null
			});

			const results = await transactionService.checkPermission({
				userId: 'wrong-id',
				transactionId: transactionHistoryMock.id
			});

			expect(results).toEqual({
				error: errorMessages['transaction-not-found'],
				transactions: null
			});
		});
	});

	describe('findTransactionById', () => {
		it('should be able to find transaction history', async () => {
			prismaMock.transactionHistory.findUnique.mockResolvedValueOnce(expectData);
			const results = await transactionService.findTransactionById(transactionHistoryMock.id);

			expect(results).toEqual({ error: null, transactions: expectData });
		});

		it('should be return error', async () => {
			prismaMock.transactionHistory.findUnique.mockResolvedValueOnce(null);
			const results = await transactionService.findTransactionById(transactionHistoryMock.id);

			expect(results).toEqual({
				error: errorMessages['transaction-not-found'],
				transactions: null
			});
		});
	});

	describe('deleteTransaction', () => {
		it('should be able to find transaction history', async () => {
			const spyOn = vi.spyOn(transactionService, 'checkPermission');
			spyOn.mockResolvedValueOnce({ error: null, transactions: expectData });

			prismaMock.transactionHistory.delete.mockResolvedValueOnce(transactionHistoryMock);

			const results = await transactionService.deleteTransaction({
				transactionId: transactionHistoryMock.id,
				userId
			});

			expect(results).toEqual({ error: null, ok: true });
		});

		it('should return error', async () => {
			const spyOn = vi.spyOn(transactionService, 'checkPermission');
			spyOn.mockResolvedValueOnce({ error: errorMessages.forbidden, transactions: null });

			const results = await transactionService.deleteTransaction({
				transactionId: transactionHistoryMock.id,
				userId
			});

			expect(results).toEqual({ error: errorMessages.forbidden, ok: false });
		});
	});
});
