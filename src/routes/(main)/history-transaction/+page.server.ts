import { transactionService } from '$lib/server/service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { data } = await parent();

	const { transactions } = await transactionService.findListTransactions(data.id);

	return { transactions };
};
