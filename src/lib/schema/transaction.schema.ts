import type { Product } from '@prisma/client';

export interface CreateTransactionDto {
	userId: string;
	products: Product[];
}

export interface PermissionAccessTransaction {
	transactionId: string;
	userId: string;
}

export interface DeleteTransactionDto {
	transactionId: string;
	userId: string;
}
