import { authService } from '$lib/server/service';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, request }) => {
	const { data, error } = await authService.getUserFromToken({
		userAgent: request.headers.get('user-agent') || '',
		cookies
	});

	return { data, error };
};
