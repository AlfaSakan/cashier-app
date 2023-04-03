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

<div class="flex min-h-[calc(100vh-10rem)] w-full items-center justify-center flex-col gap-4 px-4">
	<h1 class="font-bold text-4xl">Registrasi Akun</h1>
	<form
		action="?/signUp"
		method="post"
		class="card shadow-xl w-full max-w-sm bg-base-100 p-10 border border-base-content border-opacity-20"
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
		<span class="flex items-center gap-1">
			<p>Sudah punya akun?</p>
			<a href="/login" class="text-primary font-semibold">Masuk</a>
		</span>
		<button class="btn btn-primary w-full" disabled={loading}>Masuk</button>
	</form>
</div>
