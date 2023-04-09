<script lang="ts">
	export let value = '';
	export let name = '';
	export let min: number | string = 0;
	export let max: number | string = 999999;
	export let maxlength = 3;
	let className = 'w-14 h-12';
	export { className as class };
</script>

<input
	class="bg-transparent focus:outline-none text-center rounded text-xl border border-base-content border-opacity-20 {className}"
	{max}
	{maxlength}
	{min}
	type="number"
	{name}
	{value}
	on:input
	on:focus
	on:blur
/>
