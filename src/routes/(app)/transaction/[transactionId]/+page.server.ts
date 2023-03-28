import { transactionService } from '$lib/server/service';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params }) => {
	const { data } = await parent();
	if (data === null) throw redirect(301, '/login');

	const { error: err, transaction } = await transactionService.findTransactionById(
		params.transactionId
	);
	if (err) throw error(400, { message: err });

	return { transaction };
};
