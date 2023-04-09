import { transactionService } from '$lib/server/service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { transactions } = await transactionService.findListTransactions(locals.user.id);

	return { transactions };
};
