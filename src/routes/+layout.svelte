<script lang="ts">
	import { themeStore } from '$lib/client/store/theme.store';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		const dataTheme = localStorage.getItem('data-theme');
		document.documentElement.setAttribute('data-theme', dataTheme || 'emerald');
		$themeStore = dataTheme || 'emerald';
	});
</script>

<slot />
