<script lang="ts">
	import { TextInput } from '$lib/client/components';
	import Plus from '$lib/client/components/Icons/Plus.svelte';
	import { getLabelDate } from '$lib/client/utils/date.util';
	import { formatNumberToRupiah } from '$lib/client/utils/number.util';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let search = '';
	function handleChangeSearch(event: Event) {
		const target = event.target as HTMLSelectElement;
		search = target.value;
	}

	$: products = data.products.filter((product) =>
		product.name.toLowerCase().includes(search.toLowerCase())
	);
</script>

<div class="-mt-4 flex items-center gap-2">
	<TextInput
		label=""
		name="search"
		value={search}
		placeholder="Pencarian"
		on:input={handleChangeSearch}
	/>
	<a type="button" class="btn btn-primary" href="/add-product">
		<Plus width="24" height="24" />
	</a>
</div>

<div class="overflow-x-auto">
	<table class="table table-compact w-full">
		<thead>
			<tr>
				<th>No</th>
				<th>Nama</th>
				<th>Harga</th>
				<th>Jumlah</th>
				<th>Satuan</th>
				<th>Terjual</th>
				<th>Perubahan Terakhir</th>
			</tr>
		</thead>
		<tbody>
			{#each products as product, index (product.id)}
				<tr>
					<th>{index + 1}</th>
					<td>{product.name}</td>
					<td>{formatNumberToRupiah(product.price)}</td>
					<td>{product.amount}</td>
					<td>{product.unit}</td>
					<td>120</td>
					<td>{getLabelDate(product.updatedAt)}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th>No</th>
				<th>Nama</th>
				<th>Harga</th>
				<th>Jumlah</th>
				<th>Satuan</th>
				<th>Terjual</th>
				<th>Perubahan Terakhir</th>
			</tr>
		</tfoot>
	</table>
</div>
