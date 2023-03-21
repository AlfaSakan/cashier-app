import { z } from 'zod';
import { userId } from './user.schema';

export const productName = z.string().min(3).max(150).trim();
export const productDescription = z.string().min(3).trim();
export const productAmount = z.coerce.number().min(0).default(0);
export const gender = z.string().min(1).trim();
export const category = z.string().min(1).trim();
export const genderId = z.number().default(0);
export const categoryId = z.number().default(0);
export const price = z.number().min(0).default(0);
export const amount = z.number().min(0).default(0);
export const productId = z.string();

export const createProductDto = z.object({
	name: productName,
	description: productDescription,
	price,
	amount,
	userId: userId
});

export const updateProductDto = z.object({
	name: productName.optional(),
	description: productDescription.optional(),
	price: price.optional(),
	amount: price.optional(),
	userId: userId,
	id: productId
});

export const generalProductDto = z.object({
	userId: userId,
	id: productId
});

export type CreateProductDto = z.infer<typeof createProductDto>;
export type UpdateProductDto = z.infer<typeof updateProductDto>;
export type GeneralProductDto = z.infer<typeof generalProductDto>;
