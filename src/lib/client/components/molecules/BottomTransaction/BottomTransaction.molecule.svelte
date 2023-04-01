<script lang="ts">
	export let totalProduct = 0;
	export let totalAmount = 0;
	export let totalPrice = '';
	export let href = '/transaction';
</script>

<div class="absolute bottom-0 left-0 w-full px-4 animate-show-bottom-content">
	<a {href} class="bg-primary rounded-lg w-full flex py-4 px-3 items-start gap-2 text-current">
		<div class="flex flex-col flex-1 items-start">
			<p class="font-semibold line-clamp-1">Total produk {totalProduct}</p>
			<p>Total barang {totalAmount}</p>
		</div>
		<div>
			<p class="font-bold">{totalPrice}</p>
		</div>
	</a>
</div>
