<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { TextInput } from '$lib/client/components';
	import { validateData } from '$lib/client/utils/validate-data.util';
	import { loginDto, type LoginDto } from '$lib/schema/session.schema';

	let loading = false;
	let fieldErrors: Record<string, string>;

	const submitForm: SubmitFunction = async ({ data, cancel }) => {
		loading = true;
		const formData = Object.fromEntries(data) as LoginDto;

		const { error } = validateData(formData, loginDto);

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
					fieldErrors = {
						...fieldErrors,
						email: result.data?.email,
						password: result.data?.password
					};
					break;
				case 'redirect':
					update();
					break;

				default:
					break;
			}
			loading = false;
		};
	};
</script>

<div class="flex min-h-[calc(100vh-10rem)] w-full items-center justify-center flex-col gap-4 px-4">
	<h1 class="text-4xl font-bold">Masuk Aplikasi</h1>
	<form
		action="?/signIn"
		method="post"
		class="w-full max-w-sm p-10 border shadow-xl card bg-base-100 border-base-content border-opacity-20"
		use:enhance={submitForm}
	>
		<TextInput
			label="Masukkan email"
			name="email"
			error={fieldErrors?.email}
			placeholder="Email"
			type="email"
		/>
		<TextInput
			label="Masukkan password"
			name="password"
			error={fieldErrors?.password}
			placeholder="Password"
			type="password"
		/>
		<span class="flex items-center gap-1">
			<p>Belum punya akun?</p>
			<a href="/register" class="font-semibold text-primary">Daftar</a>
		</span>
		<button disabled={loading} class="w-full btn btn-primary">Masuk</button>
	</form>
</div>
