import { validateData } from '$lib/client/utils/validate-data.util';
import { createProductDto } from '$lib/schema/product.schema';
import { productService } from '$lib/server/service';
import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { data } = await parent();

	if (data === null) throw redirect(301, '/login');

	return { user: data };
};

export const actions: Actions = {
	createProduct: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;

		const { data, error: err } = validateData(
			formData,
			createProductDto.extend({ userId: z.string() })
		);
		if (err !== null) throw fail(400);

		const { error: errProduct } = await productService.createProduct({ ...data });
		if (errProduct !== null) throw error(400, errProduct);

		throw redirect(301, '/store');
	}
};
