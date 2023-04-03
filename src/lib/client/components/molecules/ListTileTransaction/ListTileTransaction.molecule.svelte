<script lang="ts">
	import { getLabelDate } from '$lib/client/utils/date.util';
	import { formatNumberToRupiah } from '$lib/client/utils/number.util';
	import type { Transaction } from '$lib/client/utils/types.util';
	import { onMount } from 'svelte';

	export let href = '/transaction';
	export let transaction: Transaction;

	let totalProduct = 0;
	let totalAmount = 0;
	let totalPrice = '';

	onMount(() => {
		let amount = 0;
		let products = 0;
		let charge = 0;

		transaction.TransactionProduct.forEach((tp) => {
			amount += tp.productSold;
			products += 1;
			charge += tp.productSold * tp.currentPrice;
		});

		totalAmount = amount;
		totalProduct = products;
		totalPrice = formatNumberToRupiah(charge);
	});
</script>

<a
	{href}
	class="border-base-content border-opacity-20 border rounded-lg w-full flex py-4 px-3 items-start gap-2"
>
	<div class="flex flex-col flex-1 items-start justify-between">
		<p class="font-semibold line-clamp-1">Total produk {totalProduct}</p>
		<p class="">Total barang {totalAmount}</p>
	</div>
	<div class="flex flex-col items-end h-full justify-between">
		<p class="text-xs">
			{getLabelDate(transaction.createdAt)}
		</p>
		<p class="font-bold">{totalPrice}</p>
	</div>
</a>
