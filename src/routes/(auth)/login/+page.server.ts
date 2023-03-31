import { cookiesKey } from '$lib/client/constants/cookies.constant';
import { DAYS_IN_SECOND, generateNext7Days } from '$lib/client/utils/date.util';
import type { LoginDto } from '$lib/schema/session.schema';
import { authService } from '$lib/server/service';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	signIn: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData()) as LoginDto;

		const loginData = await authService.login(
			{
				email: formData.email,
				password: formData.password
			},
			request.headers.get('user-agent')
		);

		if (loginData.error) {
			if (loginData.error === 'User tidak ditemukan') return fail(400, { email: loginData.error });
			if (loginData.error === 'Password salah') return fail(400, { password: loginData.error });
			throw error(500, { message: loginData.error });
		}

		cookies.set(cookiesKey.accessKey, loginData.token.accessToken, {
			secure: true,
			path: '/',
			expires: generateNext7Days(),
			maxAge: 7 * DAYS_IN_SECOND
		});
		cookies.set(cookiesKey.refreshKey, loginData.token.refreshToken, {
			secure: true,
			path: '/',
			expires: generateNext7Days(),
			maxAge: 7 * DAYS_IN_SECOND
		});

		throw redirect(303, '/');
	}
};
