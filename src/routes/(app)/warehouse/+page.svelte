<script lang="ts">
	import { ListTileProduct, TextInput } from '$lib/client/components';
	import Person from '$lib/client/components/Icons/Person.svelte';
	import Plus from '$lib/client/components/Icons/Plus.svelte';
	import type { ListTileEvent } from '$lib/client/components/molecules/ListTileProduct/event-type';
	import { selectedProduct } from '$lib/client/store/product.store';
	import { countProductsAmount, countTotalProductsPrice } from '$lib/client/utils/product.util';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	//#region SEARCH
	let search = '';

	function handleChangeSearch(event: Event) {
		const target = event.target as HTMLSelectElement;
		search = target.value;
	}
	//#endregion

	$: filteredProducts = data.products.filter((product) =>
		product.name.toLowerCase().includes(search.toLowerCase())
	);

	function handleAmount(event: CustomEvent<ListTileEvent>) {
		if (event.detail.selectedAmount === 0) {
			const newData = [...$selectedProduct];
			const foundIndex = newData.findIndex((pro) => pro.id === event.detail.productId);

			newData.splice(foundIndex, 1);
			$selectedProduct = newData;
			return;
		}

		$selectedProduct = $selectedProduct.map((product) => {
			if (product.id === event.detail.productId) {
				return { ...product, amount: event.detail.selectedAmount };
			}

			return product;
		});
	}

	function handleSelectCard(event: CustomEvent<ListTileEvent>) {
		const product = data.products.find((pro) => pro.id === event.detail.productId);
		if (!product) return;

		const isExist = $selectedProduct.find((pro) => pro.id === event.detail.productId);
		if (!isExist) {
			$selectedProduct = [...$selectedProduct, { ...product, amount: 1 }];
			return;
		}

		$selectedProduct = $selectedProduct.map((pro) => {
			if (pro.id !== event.detail.productId) return pro;

			return { ...pro, amount: pro.amount + 1 };
		});
	}
</script>

<div class="-mt-4 flex items-center gap-2">
	<TextInput
		label=""
		name="search"
		value={search}
		placeholder="Pencarian"
		on:input={handleChangeSearch}
	/>
	<a type="button" class="btn bg-white" href="/add-product">
		<Plus width="24" height="24" />
	</a>
</div>
<div class="flex flex-col gap-4">
	{#each filteredProducts as product (product.id)}
		<ListTileProduct
			on:add={handleAmount}
			on:subtract={handleAmount}
			{product}
			on:select={handleSelectCard}
			stockInCart={$selectedProduct.find((pro) => pro.id === product.id)?.amount}
		/>
	{/each}
</div>

{#if $selectedProduct.length > 0}
	<div class="absolute bottom-0 left-0 w-full px-4 animate-show-bottom-content">
		<button class="bg-slate-100 rounded-lg w-full flex py-4 px-3 items-center gap-2">
			<div class="rounded-full bg-slate-300 w-12 h-12 flex items-center justify-center">
				<Person />
			</div>
			<div class="flex flex-col flex-1 items-start">
				<p class="font-semibold line-clamp-1">Total produk {$selectedProduct.length}</p>
				<p>Total barang {countProductsAmount($selectedProduct)}</p>
				<p>{countTotalProductsPrice($selectedProduct)}</p>
			</div>
		</button>
	</div>
{/if}
