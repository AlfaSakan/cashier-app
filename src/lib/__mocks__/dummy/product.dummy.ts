import type { Product } from '@prisma/client';
import { timeMock, userId } from './user.dummy';

export const productMock: Product = {
	...timeMock,
	amount: 10,
	description: 'description',
	id: 'productId',
	name: 'name',
	price: 1000,
	userId
};

export const productMock2: Product = {
	...timeMock,
	amount: 20,
	description: 'description',
	id: 'productId',
	name: 'name',
	price: 2000,
	userId
};
