<script lang="ts">
	import { formatNumberToRupiah } from '$lib/client/utils/number.util';
	import type { Product } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';
	import TextInputNumber from '../../atoms/TextInputNumber/TextInputNumber.atom.svelte';
	import Minus from '../../Icons/Minus.svelte';
	import Person from '../../Icons/Person.svelte';
	import Plus from '../../Icons/Plus.svelte';
	import type { ListTileDispatch } from './event-type';

	const dispatch = createEventDispatcher<ListTileDispatch>();

	export let product: Product;
	export let stockInCart: number | undefined;

	function handleAddAmount() {
		dispatch('add', {
			selectedAmount: stockInCart ? stockInCart + 1 : 1,
			productId: product.id
		});
	}

	function handleSubtractAmount() {
		dispatch('subtract', {
			selectedAmount: stockInCart ? stockInCart - 1 : 1,
			productId: product.id
		});
	}

	function handleClickCard() {
		dispatch('select', {
			selectedAmount: 1,
			productId: product.id
		});
	}
</script>

<button
	class="bg-slate-100 rounded-lg flex py-4 px-3 items-center gap-2"
	on:click={handleClickCard}
>
	<div class="rounded-full bg-slate-300 w-12 h-12 flex items-center justify-center">
		<Person />
	</div>
	<div class="flex flex-col flex-1 items-start">
		<p class="font-semibold line-clamp-1">{product.name}</p>
		<p>{formatNumberToRupiah(product.price)}</p>
		<p class="text-sm text-zinc-500">{product.amount} {product.unit}</p>
	</div>
	{#if stockInCart}
		<div class="ml-auto flex items-center gap-1">
			<TextInputNumber value={stockInCart.toString()} />
			<div class="flex flex-col items-center justify-between gap-1">
				<button
					type="button"
					class="shadow bg-white rounded"
					on:click|stopPropagation={handleAddAmount}
				>
					<Plus />
				</button>
				<button
					type="button"
					class="shadow bg-white rounded"
					on:click|stopPropagation={handleSubtractAmount}
				>
					<Minus />
				</button>
			</div>
		</div>
	{/if}
</button>
