<script lang="ts">
	import { ListTileProduct, TextInput } from '$lib/client/components';
	import Plus from '$lib/client/components/Icons/Plus.svelte';

	let form = {
		name: 'signature',
		price: 'Rp 22500',
		amount: '10'
	};

	function handleAmount(event: CustomEvent<{ amount: number }>) {
		form = { ...form, amount: event.detail.amount.toString() };
	}
</script>

<div class="-mt-4 flex items-center gap-2">
	<TextInput label="" name="search" placeholder="Pencarian" />
	<a type="button" class="btn bg-white" href="/add-product">
		<Plus width="24" height="24" />
	</a>
</div>
<ListTileProduct
	on:add={handleAmount}
	on:subtract={handleAmount}
	amount={form.amount}
	name={form.name}
	price={form.price}
/>
