<script lang="ts">
	import Moon from '../../Icons/Moon.svelte';
	import Sun from '../../Icons/Sun.svelte';

	export let checked = true;
</script>

<label class="swap swap-rotate">
	<!-- this hidden checkbox controls the state -->
	<input type="checkbox" on:click {checked} aria-label="toggle theme" />

	<!-- sun icon -->
	<Sun class="swap-on fill-current w-6 h-6" />

	<!-- moon icon -->
	<Moon class="swap-off fill-current w-6 h-6" />
</label>
