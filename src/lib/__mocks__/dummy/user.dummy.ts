import type { User } from '@prisma/client';

export const userId = 'user-id';
export const timeMock = { createdAt: 0, updatedAt: 0 };

export const userMock: User = {
	name: 'name',
	email: 'example@gmail.com',
	id: userId,
	hash: 'hash',
	level: 'user',
	storeName: 'storeName',
	placeOfBirth: 'placeOfBirth',
	dateOfBirth: 0,
	...timeMock
};
