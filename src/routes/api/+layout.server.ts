import { errorMessages } from '$lib/client/constants/error.constant';
import { authService } from '$lib/server/service';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const result = await authService.getUserFromToken({
		cookies
	});

	if (result.data === null) {
		if (result.error === 'User tidak ditemukan')
			throw error(404, { message: errorMessages['user-not-found'] });

		throw error(403, { message: errorMessages['user-not-found'] });
	}

	return { user: result.data };
};
