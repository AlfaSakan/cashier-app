import { authService } from '$lib/server/service';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const result = await authService.getUserFromToken({
		cookies
	});

	return result;
};
