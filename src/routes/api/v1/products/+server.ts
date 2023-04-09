import { productService } from '$lib/server/service';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	const { user } = locals;

	productService.findListProductByUserId(user.id);

	return new Response();
};
