import { authService, cookiesService } from '$lib/server/service';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, parent }) => {
	const { data } = await parent();

	authService.deleteSession(data.sessionId);

	cookiesService.deleteTokens(cookies);

	throw redirect(302, '/login');
};
