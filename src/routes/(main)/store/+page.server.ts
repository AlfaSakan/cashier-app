import { productService } from '$lib/server/service';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { error: err, products } = await productService.findListProductByUserId(locals.user.id);

	if (err !== null) throw error(400, { message: err });

	return {
		products
	};
};
