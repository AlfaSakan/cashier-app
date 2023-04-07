import { cookiesKey } from '$lib/client/constants/cookies.constant';
import { DAYS_IN_SECOND, generateNext7Days } from '$lib/client/utils/date.util';
import type { Cookies } from '@sveltejs/kit';

export class CookiesService {
	private setToken(cookies: Cookies, key: string, value: string) {
		cookies.set(key, value, {
			secure: true,
			path: '/',
			expires: generateNext7Days(),
			maxAge: 7 * DAYS_IN_SECOND
		});
	}

	setAccessToken(cookies: Cookies, value: string) {
		this.setToken(cookies, cookiesKey.accessKey, value);
	}

	setRefreshToken(cookies: Cookies, value: string) {
		this.setToken(cookies, cookiesKey.refreshKey, value);
	}

	getTokens(cookies: Cookies) {
		const accessToken = cookies.get(cookiesKey.accessKey);
		const refreshToken = cookies.get(cookiesKey.refreshKey);

		return { accessToken, refreshToken };
	}

	deleteTokens(cookies: Cookies) {
		cookies.delete(cookiesKey.accessKey);
		cookies.delete(cookiesKey.refreshKey);
	}
}
