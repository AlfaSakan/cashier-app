import type { UpdateUserForm } from '$lib/schema/user.schema';
import { userService } from '$lib/server/service';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { data } = await parent();

	return { user: data };
};

export const actions: Actions = {
	updateProfile: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData()) as UpdateUserForm & {
			userId: string;
		};

		const { error: err } = await userService.updateUser({ ...formData });
		if (err) throw error(500, { message: err });

		return;
	}
};
