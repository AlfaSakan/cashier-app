import type { UpdateUserForm } from '$lib/schema/user.schema';
import { userService } from '$lib/server/service';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	return { user: locals.user };
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as UpdateUserForm;

		const { error: err } = await userService.updateUser({ ...formData, userId: locals.user.id });
		if (err) throw error(500, { message: err });

		return;
	}
};
