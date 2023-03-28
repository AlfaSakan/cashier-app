<script lang="ts">
	import { format } from '$lib/client/utils/date.util';
	import { formatNumberToRupiah } from '$lib/client/utils/number.util';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	$: transaction = data.transaction;
	$: totalPrice = data.transaction.TransactionProduct.reduce(
		(prev, curr) => prev + curr.currentPrice * curr.productSold,
		0
	);
</script>

<div class="grid grid-cols-9 text-center text-sm gap-y-4">
	<div class="col-span-7 text-start text-base">
		<p class="font-medium">Pukul</p>
	</div>
	<div class="col-span-2 text-right">
		<p class="font-medium">{format(transaction.createdAt, 'HH:mm')}</p>
	</div>
	<div class="col-span-6 text-start text-base">
		<p class="font-medium">Tanggal</p>
	</div>
	<div class="col-span-3 text-right">
		<p class="font-medium">
			{format(transaction.createdAt, 'dd MMMM yyyy')}
		</p>
	</div>

	<div class="font-medium"><p>No</p></div>
	<div class="font-medium col-span-3 text-left"><p>Name</p></div>
	<div class="font-medium"><p>Jumlah</p></div>
	<div class="col-span-2 font-medium"><p>Harga</p></div>
	<div class="col-span-2 font-medium"><p>Total</p></div>
	{#each transaction.TransactionProduct as tp, index (tp.id)}
		<div class=""><p>{index + 1}</p></div>
		<div class="col-span-3 text-left"><p>{tp.product.name}</p></div>
		<div class=""><p>{tp.product.amount}</p></div>
		<div class="col-span-2">
			<p>{formatNumberToRupiah(tp.product.price)}</p>
		</div>
		<div class="col-span-2">
			<p>{formatNumberToRupiah(tp.product.price * tp.product.amount)}</p>
		</div>
	{/each}

	<div class="col-span-7 text-start text-base">
		<p class="font-medium">Total</p>
	</div>
	<div class="col-span-2 text-right">
		<p class="font-medium">{formatNumberToRupiah(totalPrice)}</p>
	</div>

	<div class="col-span-7 text-start text-base">
		<p class="font-medium">Uang yang dibayarkan</p>
	</div>
	<div class="col-span-2 text-right">
		<p class="font-medium">{formatNumberToRupiah(transaction.moneyPaid)}</p>
	</div>

	<div class="col-span-7 text-start text-base">
		<p class="font-medium">Kembalian</p>
	</div>
	<div class="col-span-2 text-right">
		<p class="font-medium">{formatNumberToRupiah(transaction.moneyPaid - totalPrice)}</p>
	</div>
</div>
