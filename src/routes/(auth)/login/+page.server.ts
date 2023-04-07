import type { LoginDto } from '$lib/schema/session.schema';
import { authService, cookiesService } from '$lib/server/service';
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

		cookiesService.setAccessToken(cookies, loginData.token.accessToken);
		cookiesService.setRefreshToken(cookies, loginData.token.refreshToken);

		throw redirect(303, '/');
	}
};
