import { cookiesKey } from '$lib/client/constants/cookies.constant';
import type { SignUpDto } from '$lib/schema/session.schema';
import { authService, userService } from '$lib/server/service';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	signUp: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData()) as SignUpDto;

		const userData = await userService.createUser({
			email: formData.email,
			name: formData.email.split('@')[0],
			password: formData.password
		});

		if (userData.error) return fail(400, { email: userData.error });

		const loginData = await authService.login(
			{ email: userData.user.email, password: formData.password },
			request.headers.get('user-agent')
		);

		if (loginData.error) throw error(500, { message: loginData.error });

		cookies.set(cookiesKey.accessKey, loginData.token.accessToken, { path: '/', httpOnly: true });
		cookies.set(cookiesKey.refreshKey, loginData.token.refreshToken, { path: '/', httpOnly: true });

		throw redirect(303, '/');
	}
};
