<script lang="ts">
	import { page } from '$app/stores';
	import { BottomNavigation, HeaderNavigation } from '$lib/client/components';
	import { Toaster } from 'svelte-french-toast';

	let inputRef: HTMLInputElement;

	function closeSidebar() {
		inputRef.checked = false;
	}
</script>

<div class="drawer drawer-mobile">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" bind:this={inputRef} />
	<div class="drawer-content flex flex-col">
		<!-- Page content here -->
		<HeaderNavigation />
		<div class="flex flex-col p-4 mb-16">
			<slot />
		</div>
		<Toaster />
	</div>

	<BottomNavigation currentPage={$page.url.pathname} />
	<div class="drawer-side">
		<label for="my-drawer-2" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-base-100 text-base-content">
			<!-- Sidebar content here -->
			<li><a href="/" on:click={closeSidebar}>Sidebar Item 1</a></li>
			<li><a href="/warehouse" on:click={closeSidebar}>Daftar Barang</a></li>
			<li><a href="/logout" class="btn btn-error text-white" on:click={closeSidebar}>Keluar</a></li>
		</ul>
	</div>
</div>
