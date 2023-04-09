<script lang="ts">
	import { ModalDeleteProduct, TextInput } from '$lib/client/components';
	import Plus from '$lib/client/components/Icons/Plus.svelte';
	import Trash from '$lib/client/components/Icons/Trash.svelte';
	import { getLabelDate } from '$lib/client/utils/date.util';
	import { formatNumberToRupiah } from '$lib/client/utils/number.util';
	import { toast } from 'svelte-french-toast';
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

	let visibleModal = false;
	let deleteProduct = { productId: '', productName: '' };
	function handleDeleteProduct(productId: string, productName: string) {
		toggleModal();
		deleteProduct = { productId, productName };
	}

	function toggleModal() {
		visibleModal = !visibleModal;
	}

	async function handleConfirmDelete() {
		try {
			await fetch('/warehouse', {
				body: JSON.stringify({ productId: deleteProduct.productId, userId: data.user.id }),
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				}
			});

			data.products = data.products.filter((pro) => pro.id !== deleteProduct.productId);

			toggleModal();
			deleteProduct = { productId: '', productName: '' };
			toast.success('Produk berhasil dihapus');
		} catch (error) {
			toast.error('Terjadi kesalahan coba lagi nanti');
			console.warn(error);
		}
	}

	// const headerItems = ['No', 'Nama', 'Harga', 'Jumlah', 'Satuan', 'Terjual', 'Perubahan', 'Hapus'];
	const headerItems: { name: string; colspan: number }[] = [
		{ name: 'No', colspan: 1 },
		{ name: 'Nama', colspan: 2 },
		{ name: 'Harga', colspan: 2 },
		{ name: 'Jumlah', colspan: 1 },
		{ name: 'Satuan', colspan: 1 },
		{ name: 'Terjual', colspan: 1 },
		{ name: 'Perubahan', colspan: 1 },
		{ name: 'Hapus', colspan: 1 }
	];
</script>

<div class="-mt-4 flex items-center gap-2">
	<TextInput
		label=""
		name="search"
		value={search}
		placeholder="Pencarian"
		on:input={handleChangeSearch}
	/>
	<a
		type="button"
		class="btn btn-primary"
		href="/add-product"
		aria-label="add new product"
		data-testid="navigate:add-product"
	>
		<Plus width="24" height="24" />
	</a>
</div>

<div class="overflow-x-auto">
	<table class="table table-compact w-full" data-testid="table:products">
		<thead>
			<tr>
				{#each headerItems as item, index (index)}
					<th colspan={item.colspan}>{item.name}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each products as product, index (product.id)}
				<tr>
					<th>{index + 1}</th>
					<td colspan="2">{product.name}</td>
					<td colspan="2">{formatNumberToRupiah(product.price)}</td>
					<td>{product.amount}</td>
					<td>{product.unit}</td>
					<td>120</td>
					<td>{getLabelDate(product.updatedAt)}</td>
					<td class="flex items-center justify-center">
						<button
							on:click={() => handleDeleteProduct(product.id, product.name)}
							data-testid="table:product:delete:{index + 1}"
							aria-label="button delete product"
						>
							<Trash class="fill-error" />
						</button>
					</td>
				</tr>
			{:else}
				<tr>
					<th />
					<td class="w-full flex items-center justify-center">
						<p>Belum ada barang</p>
					</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				{#each headerItems as item, index (index)}
					<th colspan={item.colspan}>{item.name}</th>
				{/each}
			</tr>
		</tfoot>
	</table>
</div>

{#if visibleModal}
	<ModalDeleteProduct
		productName={deleteProduct.productName}
		onCancel={toggleModal}
		onConfirm={handleConfirmDelete}
	/>
{/if}
