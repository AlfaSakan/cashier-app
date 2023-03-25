<script lang="ts">
	export let value = '';
	export let min: number | string = 0;
	export let maxlength = 3;
</script>

<input
	class="border border-gray-900 focus:outline-none border-opacity-20 text-center w-14 h-12 rounded text-xl"
	{maxlength}
	{min}
	type="number"
	{value}
/>
