<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { TextInput, TextInputArea } from '$lib/client/components';
	import { validateData } from '$lib/client/utils/validate-data.util';
	import { createProductDto } from '$lib/schema/product.schema';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	$: product = data.product;
	$: user = data.user;

	let fieldErrors: Record<string, string>;
	let loading = false;

	const submitForm: SubmitFunction = ({ data, cancel }) => {
		loading = true;
		const formData = Object.fromEntries(data);
		const { error } = validateData(formData, createProductDto);

		data.set('userId', user.id);

		if (error) {
			fieldErrors = error as Record<string, string>;
			cancel();
		} else {
			fieldErrors = {};
		}

		return ({ result, update }) => {
			switch (result.type) {
				case 'failure':
					fieldErrors = {
						...fieldErrors,
						...result.data
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

<form action="?/updateProduct" method="post" use:enhance={submitForm}>
	<TextInput
		name="name"
		label="Nama Barang"
		value={product.name}
		placeholder="+3 huruf"
		error={fieldErrors?.name}
	/>

	<div class="grid grid-cols-2 gap-4">
		<TextInput
			name="amount"
			label="Jumlah Barang"
			placeholder="0"
			type="number"
			error={fieldErrors?.amount}
			value={product.amount}
		/>
		<TextInput
			name="unit"
			label="Satuan Barang"
			placeholder="+3 huruf"
			error={fieldErrors?.unit}
			value={product.unit}
		/>
	</div>

	<TextInput
		name="price"
		label="Harga Barang"
		placeholder="0"
		type="number"
		error={fieldErrors?.price}
		value={product.price}
	>
		<span slot="leading">Rp</span>
	</TextInput>

	<TextInputArea
		name="description"
		label="Deskripsi Barang"
		error={fieldErrors?.description}
		value={product.description}
	/>
	<button type="submit" class="btn btn-primary w-full" disabled={loading}>Simpan</button>
</form>
