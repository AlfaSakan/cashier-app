import { productService } from '$lib/server/service';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = locals;

	const { error: err, products } = await productService.findListProductByUserId(user.id);
	if (err) throw error(400, { message: err });

	return {
		products,
		user: user
	};
};
