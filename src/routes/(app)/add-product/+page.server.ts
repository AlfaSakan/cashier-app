import { validateData } from '$lib/client/utils/validate-data.util';
import { createProductDto } from '$lib/schema/product.schema';
import { productService } from '$lib/server/service';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	return { user: locals.user, initForm: { barcode: url.searchParams.get('barcode') || '' } };
};

export const actions: Actions = {
	createProduct: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;

		const { data, error: err } = validateData(formData, createProductDto);
		if (err !== null) throw fail(400);

		const { error: errProduct } = await productService.createProduct({
			...data,
			userId: locals.user.id
		});
		if (errProduct !== null) throw error(400, errProduct);

		throw redirect(301, '/store');
	}
};
