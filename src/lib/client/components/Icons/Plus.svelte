<script lang="ts">
	export let width = '20';
	export let height = '20';
	export let fill = '#000000';
</script>

<svg {width} {height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M6 12H18"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke={fill}
	/>
	<path
		d="M12 18V6"
		stroke={fill}
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
