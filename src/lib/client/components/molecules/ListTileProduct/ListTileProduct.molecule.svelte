<script lang="ts">
	import { formatNumberToRupiah } from '$lib/client/utils/number.util';
	import type { Product } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';
	import TextInputNumber from '../../atoms/TextInputNumber/TextInputNumber.atom.svelte';
	import Minus from '../../Icons/Minus.svelte';
	import Person from '../../Icons/Person.svelte';
	import Plus from '../../Icons/Plus.svelte';
	import Setting from '../../Icons/Setting.svelte';
	import type { ListTileDispatch } from './event-type';

	const dispatch = createEventDispatcher<ListTileDispatch>();

	export let product: Product;
	export let stockInCart: number | undefined;
	export let href = '';
	export let isFocus = false;

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

	function handleInput(event: Event) {
		const target = event.target as HTMLSelectElement;
		const input = Number(target.value);

		const inputAmount = input > product.amount ? product.amount : input;

		dispatch('input', {
			productId: product.id,
			inputAmount
		});
	}

	function handleFocus() {
		isFocus = true;
	}

	function handleBlur() {
		isFocus = false;
		dispatch('blur', {
			productId: product.id
		});
	}
</script>

<div class="relative">
	<button
		class="border-base-content w-full border-opacity-20 border rounded-lg flex py-4 px-3 items-center gap-2"
		on:click={handleClickCard}
	>
		<div class="rounded-full bg-primary w-12 h-12 flex items-center justify-center">
			<Person class="fill-base-100" />
		</div>
		<div class="flex flex-col flex-1 items-start text-current">
			<p class="font-semibold line-clamp-1">{product.name}</p>
			<p>{formatNumberToRupiah(product.price)}</p>
			<p class="text-sm">{product.amount} {product.unit}</p>
		</div>
		{#if stockInCart || isFocus}
			<button class="ml-auto flex items-center gap-1" on:click|stopPropagation>
				<TextInputNumber
					value={(stockInCart || 0).toString()}
					on:input={handleInput}
					on:blur={handleBlur}
					on:focus={handleFocus}
				/>
				<div class="flex flex-col items-center justify-between gap-1">
					<button
						type="button"
						class="shadow bg-primary rounded"
						on:click|stopPropagation={handleAddAmount}
					>
						<Plus />
					</button>
					<button
						type="button"
						class="shadow bg-primary rounded"
						on:click|stopPropagation={handleSubtractAmount}
					>
						<Minus />
					</button>
				</div>
			</button>
		{/if}
	</button>
	{#if !(stockInCart || isFocus)}
		<a {href} class="mb-auto absolute top-3 right-3">
			<Setting />
		</a>
	{/if}
</div>
