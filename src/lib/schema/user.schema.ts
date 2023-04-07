import { z } from 'zod';

export const emailSchema = z.string().email();
export const userId = z.string();

export interface CreateUserDto {
	name: string;
	email: z.infer<typeof emailSchema>;
	password: string;
}

export interface CreateAdminDto {
	name: string;
	email: z.infer<typeof emailSchema>;
	password: string;
	level: string;
}

export interface ValidatePasswordUser extends Pick<CreateUserDto, 'password'> {
	id?: string;
	email?: z.infer<typeof emailSchema>;
}

export const updateUserForm = z.object({
	name: z.string().min(3),
	storeName: z.string().min(3),
	placeOfBirth: z.string().min(3),
	dateOfBirth: z.string().refine(
		(date) => {
			return !isNaN(new Date(date).getTime());
		},
		{ message: 'Input bukan merupakan format date' }
	)
});

export type UpdateUserForm = z.infer<typeof updateUserForm>;
