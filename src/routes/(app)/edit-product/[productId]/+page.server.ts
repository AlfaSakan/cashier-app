import { validateData } from '$lib/client/utils/validate-data.util';
import { updateProductDto } from '$lib/schema/product.schema';
import { productService } from '$lib/server/service';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { data } = await parent();

	const { product, error: err } = await productService.findProductById({
		userId: data.id,
		id: params.productId
	});
	if (err) throw error(400, { message: err });

	return { product, user: data };
};

export const actions: Actions = {
	updateProduct: async ({ request, params }) => {
		const formData = Object.fromEntries(await request.formData());

		const { data, error: err } = validateData(formData, updateProductDto.omit({ id: true }));
		if (err !== null) throw fail(400);

		const { error: errProduct } = await productService.updateProduct({
			id: params.productId,
			...data
		});
		if (errProduct !== null) throw error(400, errProduct);

		throw redirect(301, '/warehouse');
	}
};
