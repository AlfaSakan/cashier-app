import { productService } from '$lib/server/service';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		const result = await productService.deleteProduct({ id: body.productId, userId: body.userId });
		return json(result);
	} catch (error) {
		console.error(error);
		return json({ ok: false, error: 'Bad request' });
	}
};
