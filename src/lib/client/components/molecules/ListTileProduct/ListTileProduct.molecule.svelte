<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import TextInputNumber from '../../atoms/TextInputNumber/TextInputNumber.atom.svelte';
	import Minus from '../../Icons/Minus.svelte';
	import Person from '../../Icons/Person.svelte';
	import Plus from '../../Icons/Plus.svelte';

	const dispatch = createEventDispatcher();

	export let name = '';
	export let price = 'Rp 0';
	export let amount = '0';

	function handleAddAmount() {
		dispatch('add', {
			amount: Number(amount) + 1
		});
	}
	function handleSubtractAmount() {
		dispatch('subtract', {
			amount: Number(amount) - 1
		});
	}
</script>

<div class="bg-slate-100 rounded-lg flex py-4 px-3 items-center gap-2">
	<div class="rounded-full bg-slate-300 w-12 h-12 flex items-center justify-center">
		<Person />
	</div>
	<div class="flex flex-col">
		<p class="font-semibold">{name}</p>
		<p>{price}</p>
	</div>
	<div class="ml-auto flex items-center gap-1">
		<TextInputNumber value={amount} />
		<div class="flex flex-col items-center justify-between gap-1">
			<button type="button" class="shadow bg-white rounded" on:click={handleAddAmount}>
				<Plus />
			</button>
			<button type="button" class="shadow bg-white rounded" on:click={handleSubtractAmount}>
				<Minus />
			</button>
		</div>
	</div>
</div>
