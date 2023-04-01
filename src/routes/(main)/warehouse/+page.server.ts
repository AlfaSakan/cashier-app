import { productService } from '$lib/server/service';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { data } = await parent();

	const { error: err, products } = await productService.findListProductByUserId(data.id);
	if (err) throw error(400, { message: err });

	return {
		products
	};
};
