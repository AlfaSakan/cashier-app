<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { TextInput, TextInputPassword } from '$lib/client/components';
	import { validateData } from '$lib/client/utils/validate-data.util';
	import { signUpDto } from '$lib/schema/session.schema';

	let loading = false;
	let fieldErrors: Record<string, string> = {};

	const submitForm: SubmitFunction = async ({ data, cancel }) => {
		loading = true;
		const formData = Object.fromEntries(data);

		const { error } = validateData(formData, signUpDto);

		if (error) {
			fieldErrors = error as Record<string, string>;
			loading = false;
			cancel();
		} else {
			fieldErrors = {};
		}

		return ({ result, update }) => {
			switch (result.type) {
				case 'failure':
					fieldErrors = { ...fieldErrors, email: result.data?.email };
					break;

				case 'redirect':
					update();
					break;

				default:
					update();
					break;
			}
			loading = false;
		};
	};
</script>

<div class="flex w-full h-screen items-center justify-center px-10 bg-white">
	<form
		action="?/signUp"
		method="post"
		class="card shadow-xl w-96 bg-base-100 p-10 border"
		use:enhance={submitForm}
	>
		<TextInput
			label="Masukkan email"
			name="email"
			error={fieldErrors?.email}
			placeholder="example@mail.com"
			type="email"
		/>
		<TextInputPassword
			label="Masukkan password"
			name="password"
			error={fieldErrors?.password}
			placeholder="+6 huruf"
			min={6}
		/>
		<TextInputPassword
			label="Konfirmasi password"
			name="confirmPassword"
			error={fieldErrors?.confirmPassword}
			placeholder="+6 huruf"
			min={6}
		/>
		<button class="btn btn-primary w-full" disabled={loading}>Masuk</button>
	</form>
</div>
