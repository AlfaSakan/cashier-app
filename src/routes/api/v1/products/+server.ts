import { authService, productService } from '$lib/server/service';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	const { data } = await authService.getUserFromToken({ cookies });

	productService.findListProductByUserId;

	return new Response();
};
