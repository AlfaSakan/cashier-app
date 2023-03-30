import { describe, expect, it } from 'vitest';
import { env } from './env.constant';

describe('env', () => {
	it('env should be define all', () => {
		const envTest: typeof env = {
			salt: 'sangatrahasia',
			jwtKey: 'rahasia123',
			domain: 'localhost'
		};

		expect(env).toEqual(envTest);
	});
});
