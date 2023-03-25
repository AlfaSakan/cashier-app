import { errorMessages } from '$lib/client/constants/error.constant';
import { generateUnixSecond } from '$lib/client/utils/date.util';
import type {
	CreateTransactionDto,
	DeleteTransactionDto,
	PermissionAccessTransaction
} from '$lib/schema/transaction.schema';
import prisma from '../utils/prisma';

export class TransactionService {
	async createTransaction(dto: CreateTransactionDto) {
		const transactionHistory = await prisma.transactionHistory.create({
			data: { createdAt: generateUnixSecond(), userId: dto.userId, moneyPaid: dto.moneyPaid }
		});

		await prisma.transactionProduct.createMany({
			data: dto.products.map((product) => ({
				productId: product.id,
				productSold: product.amount,
				transactionHistoryId: transactionHistory.id
			}))
		});

		const result = await this.findTransactionById(transactionHistory.id);

		return result;
	}

	async deleteTransaction(dto: DeleteTransactionDto) {
		const result = await this.checkPermission(dto);
		if (result.transactions === null) return { ok: false, error: result.error };

		await prisma.transactionHistory.delete({ where: { id: dto.transactionId } });
		return { ok: true, error: null };
	}

	async findTransactionById(transactionId: string) {
		const transactions = await prisma.transactionHistory.findUnique({
			where: { id: transactionId },
			include: { TransactionProduct: true }
		});
		if (transactions === null)
			return { transactions: null, error: errorMessages['transaction-not-found'] };

		return { transactions, error: null };
	}

	async checkPermission(dto: PermissionAccessTransaction) {
		const result = await this.findTransactionById(dto.transactionId);

		if (result.transactions === null) return result;

		if (result.transactions.userId !== dto.userId)
			return { transactions: null, error: errorMessages.forbidden };

		return result;
	}
}
