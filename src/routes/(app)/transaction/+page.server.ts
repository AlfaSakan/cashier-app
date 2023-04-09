import { transactionService } from '$lib/server/service';
import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

type FormData = {
	moneyPaid: string;
	products: string;
};

export const actions: Actions = {
	confirmTransaction: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as FormData;

		const { error: err } = await transactionService.createTransaction({
			moneyPaid: Number(formData.moneyPaid),
			products: JSON.parse(formData.products),
			userId: locals.user.id
		});

		if (err) throw error(400, { message: err });

		throw redirect(301, '/store');
	}
};
