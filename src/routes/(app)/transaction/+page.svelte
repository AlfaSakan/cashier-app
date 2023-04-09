<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { TextInputNumber } from '$lib/client/components';
	import { selectedProduct } from '$lib/client/store/product.store';
	import { formatNumberToRupiah } from '$lib/client/utils/number.util';
	import { toast } from 'svelte-french-toast';

	let moneyPaid = 0;
	let loading = false;

	$: totalPrice = $selectedProduct.reduce((prev, curr) => prev + curr.price * curr.amount, 0);
	$: disabled = moneyPaid - totalPrice < 0;

	function handleNumberChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		moneyPaid = Number(target.value);
	}

	const submitForm: SubmitFunction = ({ data }) => {
		loading = true;
		data.set('products', JSON.stringify($selectedProduct));

		return ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Transaksi berhasil');
					$selectedProduct = [];
					update();
					break;

				default:
					update();
					break;
			}

			loading = false;
		};
	};
</script>

<form
	class="grid grid-cols-9 text-center text-sm gap-y-4"
	method="post"
	use:enhance={submitForm}
	action="?/confirmTransaction"
>
	<div class="font-medium"><p>No</p></div>
	<div class="font-medium col-span-3 text-left"><p>Name</p></div>
	<div class="font-medium"><p>Jumlah</p></div>
	<div class="col-span-2 font-medium"><p>Harga</p></div>
	<div class="col-span-2 font-medium"><p>Total</p></div>
	{#each $selectedProduct as product, index (product.id)}
		<div class=""><p>{index + 1}</p></div>
		<div class="col-span-3 text-left"><p>{product.name}</p></div>
		<div class=""><p>{product.amount}</p></div>
		<div class="col-span-2">
			<p>{formatNumberToRupiah(product.price)}</p>
		</div>
		<div class="col-span-2">
			<p>{formatNumberToRupiah(product.price * product.amount)}</p>
		</div>
	{/each}

	<div class="col-span-7 text-start text-base">
		<p class="font-medium">Total</p>
	</div>
	<div class="col-span-2">
		<p class="font-medium">{formatNumberToRupiah(totalPrice)}</p>
	</div>

	<div class="col-span-5 text-start text-base">
		<p class="font-medium">Uang yang dibayarkan</p>
	</div>
	<div class="col-span-4">
		<TextInputNumber
			name="moneyPaid"
			class="w-28 h-8 text-lg"
			value={moneyPaid.toString()}
			on:input={handleNumberChange}
		/>
	</div>

	<div class="col-span-7 text-start text-base">
		<p class="font-medium">Kembalian</p>
	</div>
	<div class="col-span-2">
		<p class="font-medium">{formatNumberToRupiah(moneyPaid - totalPrice)}</p>
	</div>
	<button class="btn col-span-9" disabled={disabled || loading} type="submit">
		<p>Bayar</p>
	</button>
</form>
