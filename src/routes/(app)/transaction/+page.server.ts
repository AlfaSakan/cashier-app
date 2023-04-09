import { transactionService } from '$lib/server/service';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

type FormData = {
	moneyPaid: string;
	products: string;
	userId: string;
};

export const load: PageServerLoad = async ({ parent }) => {
	const { data } = await parent();

	return {
		user: data
	};
};

export const actions: Actions = {
	confirmTransaction: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData()) as FormData;

		const { error: err } = await transactionService.createTransaction({
			moneyPaid: Number(formData.moneyPaid),
			products: JSON.parse(formData.products),
			userId: formData.userId
		});

		if (err) throw error(400, { message: err });

		throw redirect(301, '/store');
	}
};
