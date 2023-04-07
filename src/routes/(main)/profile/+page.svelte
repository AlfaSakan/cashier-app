<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import TextInput from '$lib/client/components/atoms/TextInput/TextInput.atom.svelte';
	import { convertToDateValue } from '$lib/client/utils/date.util';
	import { validateData } from '$lib/client/utils/validate-data.util';
	import { updateUserForm } from '$lib/schema/user.schema';
	import toast from 'svelte-french-toast';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	$: user = data.user;

	let fieldErrors: Record<string, string>;

	let loading = false;

	const submitForm: SubmitFunction = async ({ data, cancel }) => {
		loading = true;
		const formData = Object.fromEntries(data);

		const { error } = validateData(formData, updateUserForm);

		if (error) {
			fieldErrors = error as Record<string, string>;
			cancel();
		} else {
			fieldErrors = {};
			data.set('userId', user.id);
		}

		return ({ result, update }) => {
			switch (result.type) {
				case 'error':
					toast.error(result.error.message);
					break;
				case 'success':
					toast.success('Berhasil menyimpan perubahan');
					break;

				default:
					update();
					break;
			}
			loading = false;
		};
	};
</script>

<div class="flex justify-center">
	<p class="text-xl font-bold">Data Pemilik Toko</p>
</div>
<form action="?/updateProfile" method="post" use:enhance={submitForm}>
	<TextInput
		label="Nama Pemilik"
		name="name"
		value={user.name}
		placeholder="+3 huruf"
		error={fieldErrors?.name}
	/>
	<TextInput
		value={user.storeName}
		label="Nama Toko"
		name="storeName"
		placeholder="+3 huruf"
		error={fieldErrors?.storeName}
	/>
	<div class="grid grid-cols-2 gap-4">
		<TextInput
			value={user.placeOfBirth}
			label="Tempat Lahir"
			name="placeOfBirth"
			placeholder="+3 huruf"
			error={fieldErrors?.placeOfBirth}
		/>
		<TextInput
			value={convertToDateValue(user.dateOfBirth)}
			label="Tanggal Lahir"
			name="dateOfBirth"
			placeholder="+3 huruf"
			type="date"
			error={fieldErrors?.dateOfBirth}
		/>
	</div>
	<button type="submit" class="w-full btn btn-primary">Simpan</button>
</form>
