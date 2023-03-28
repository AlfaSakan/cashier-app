import { userMock } from '$lib/__mocks__/dummy/user.dummy';
import { errorMessages } from '$lib/client/constants/error.constant';
import { describe, expect, it } from 'vitest';
import { generateToken, verifyToken } from './jwt-token';

const sessionId = 'session-id';

describe('generateToken', () => {
	it('should be able generate access token and refresh token', () => {
		const token = generateToken({
			sessionId,
			email: 'admin@gmail.com',
			userId: 'some-id'
		});

		expect(token?.accessToken).toBeDefined();
		expect(token?.refreshToken).toBeDefined();
	});
});

describe('verifyToken', () => {
	it('should be able to verify token', () => {
		const token = generateToken({
			sessionId,
			email: userMock.email,
			userId: userMock.id
		});

		const payload = verifyToken(token?.accessToken || '');

		expect(payload.data?.email).toBe(userMock.email);
		expect(payload.data?.userId).toBe(userMock.id);
		expect(payload.error).toBe(null);
	});

	it('should throw error', () => {
		const payload = verifyToken('');

		expect(payload).toEqual({ data: null, error: errorMessages['token-expired'] });
	});
});
