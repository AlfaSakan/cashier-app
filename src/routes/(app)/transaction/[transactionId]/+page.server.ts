import { transactionService } from '$lib/server/service';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { error: err, transaction } = await transactionService.findTransactionById(
		params.transactionId
	);
	if (err) throw error(400, { message: err });

	return { transaction };
};
