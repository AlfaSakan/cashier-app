import { cookiesKey } from '$lib/client/constants/cookies.constant';
import { authService } from '$lib/server/service';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, parent }) => {
	const { data } = await parent();

	authService.deleteSession(data.sessionId);

	cookies.delete(cookiesKey.accessKey);
	cookies.delete(cookiesKey.refreshKey);

	throw redirect(302, '/login');
};
