import { productService } from '$lib/server/service';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { data } = await parent();

	if (data === null) throw redirect(301, '/login');

	const { error: err, products } = await productService.findListProductByUserId(data.id);

	if (err !== null) throw error(400, { message: err });

	return {
		products
	};
};
