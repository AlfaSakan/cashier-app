import { errorMessages } from '$lib/client/constants/error.constant';
import { generateUnixSecond } from '$lib/client/utils/date.util';
import type {
	CreateTransactionDto,
	DeleteTransactionDto,
	PermissionAccessTransaction
} from '$lib/schema/transaction.schema';
import type { Product } from '@prisma/client';
import prisma from '../utils/prisma';
import type { ProductService } from './product.service';

export class TransactionService {
	constructor(private productService: ProductService) {}

	async createTransaction(dto: CreateTransactionDto) {
		const transactionHistory = await prisma.transactionHistory.create({
			data: { createdAt: generateUnixSecond(), userId: dto.userId, moneyPaid: dto.moneyPaid }
		});

		await prisma.transactionProduct.createMany({
			data: dto.products.map((product) => ({
				productId: product.id,
				productSold: product.amount,
				transactionHistoryId: transactionHistory.id,
				currentPrice: product.price
			}))
		});

		const promises: Promise<{ error: string | null; product: Product | null }>[] = [];

		dto.products.forEach((product) => {
			const updatedProduct = this.productService.calculateAmountProduct({
				subtract: product.amount,
				id: product.id,
				userId: dto.userId
			});

			promises.push(updatedProduct);
		});

		await Promise.allSettled(promises);

		const result = await this.findTransactionById(transactionHistory.id);

		return result;
	}

	async deleteTransaction(dto: DeleteTransactionDto) {
		const result = await this.checkPermission(dto);
		if (result.transaction === null) return { ok: false, error: result.error };

		await prisma.transactionHistory.delete({ where: { id: dto.transactionId } });
		return { ok: true, error: null };
	}

	async findTransactionById(transactionId: string) {
		const transaction = await prisma.transactionHistory.findUnique({
			where: { id: transactionId },
			include: { TransactionProduct: true }
		});
		if (transaction === null)
			return { transaction: null, error: errorMessages['transaction-not-found'] };

		return { transaction, error: null };
	}

	async checkPermission(dto: PermissionAccessTransaction) {
		const result = await this.findTransactionById(dto.transactionId);

		if (result.transaction === null) return result;

		if (result.transaction.userId !== dto.userId)
			return { transaction: null, error: errorMessages.forbidden };

		return result;
	}

	async findListTransactions(userId: string, take = 10) {
		const transactions = await prisma.transactionHistory.findMany({
			where: { userId },
			take,
			include: { TransactionProduct: true }
		});

		return { transactions, error: null };
	}
}
