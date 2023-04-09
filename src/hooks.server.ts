import { authService } from '$lib/server/service';
import { redirect, type Handle } from '@sveltejs/kit';

const unProtectedRoutes = ['/login', '/register'];

export const handle: Handle = async ({ event, resolve }) => {
	// STAGE 1
	const { cookies } = event;
	const { data } = await authService.getUserFromToken({ cookies });
	if (!unProtectedRoutes.includes(event.url.pathname)) {
		if (data === null) {
			throw redirect(303, '/login');
		} else {
			event.locals.user = data;
		}
	}

	// STAGE 2
	const response = await resolve(event);

	// STAGE 3
	return response;
};
