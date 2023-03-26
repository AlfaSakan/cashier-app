import { transactionService } from '$lib/server/service';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { data } = await parent();
	if (data === null) throw redirect(301, '/login');

	const { transactions } = await transactionService.findListTransactions(data.id);

	return { transactions };
};
