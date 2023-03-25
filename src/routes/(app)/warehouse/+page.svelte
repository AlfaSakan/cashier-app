<script lang="ts">
	import { ListTileProduct, TextInput } from '$lib/client/components';
	import Plus from '$lib/client/components/Icons/Plus.svelte';
	import BottomTransaction from '$lib/client/components/molecules/BottomTransaction/BottomTransaction.molecule.svelte';
	import type {
		ListTileEvent,
		ListTileInputEvent
	} from '$lib/client/components/molecules/ListTileProduct/event-type';
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

	function validateAmount(input: number, inputId: string) {
		let isValid = true;
		filteredProducts.forEach((pro) => {
			if (pro.id === inputId && input > pro.amount) {
				isValid = false;
			}
		});

		return isValid;
	}

	function handleAmount(event: CustomEvent<ListTileEvent>) {
		if (!validateAmount(event.detail.selectedAmount, event.detail.productId)) return;

		if (event.detail.selectedAmount === 0) {
			$selectedProduct = $selectedProduct.filter((pro) => pro.id !== event.detail.productId);
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

		const foundProduct = $selectedProduct.find((pro) => pro.id === event.detail.productId);
		if (!foundProduct) {
			$selectedProduct = [...$selectedProduct, { ...product, amount: 1 }];
			return;
		}

		let isNotValid = false;
		filteredProducts.forEach((pro) => {
			if (pro.id === foundProduct.id && foundProduct.amount + 1 > pro.amount) {
				isNotValid = true;
			}
		});
		if (isNotValid) return;

		$selectedProduct = $selectedProduct.map((pro) => {
			if (pro.id !== event.detail.productId) return pro;

			return { ...pro, amount: pro.amount + 1 };
		});
	}

	function handleInputAmount(event: CustomEvent<ListTileInputEvent>) {
		$selectedProduct = $selectedProduct.map((pro) => {
			if (pro.id === event.detail.productId) {
				return { ...pro, amount: event.detail.inputAmount };
			}
			return pro;
		});
	}

	function removeZeroAmount() {
		$selectedProduct = $selectedProduct.filter((pro) => pro.amount !== 0);
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
			href="edit-product/{product.id}"
			on:input={handleInputAmount}
			on:blur={removeZeroAmount}
		/>
	{/each}
</div>

{#if $selectedProduct.length > 0}
	<BottomTransaction
		totalAmount={countProductsAmount($selectedProduct)}
		totalPrice={countTotalProductsPrice($selectedProduct)}
		totalProduct={$selectedProduct.length}
	/>
{/if}
