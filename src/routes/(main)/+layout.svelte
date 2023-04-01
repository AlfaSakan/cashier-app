<script lang="ts">
	import { page } from '$app/stores';
	import { BottomNavigation, HeaderNavigation, SwapTheme } from '$lib/client/components';
	import { themeStore } from '$lib/client/store/theme.store';
	import { Toaster } from 'svelte-french-toast';

	let inputRef: HTMLInputElement;

	$: checkedTheme = $themeStore === 'bumblebee';

	function closeSidebar() {
		inputRef.checked = false;
	}

	function handleThemeToggle() {
		const dataTheme = checkedTheme ? 'dracula' : 'bumblebee';
		document.documentElement.setAttribute('data-theme', dataTheme);
		localStorage.setItem('data-theme', dataTheme);
		$themeStore = dataTheme;
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
		<ul class="menu p-4 w-80 bg-base-100 text-base-content gap-4">
			<!-- Sidebar content here -->
			<div class="mt-20" />
			<SwapTheme checked={checkedTheme} on:click={handleThemeToggle} />
			<li><a href="/warehouse" on:click={closeSidebar} class="btn">Daftar Barang</a></li>
			<li><a href="/" on:click={closeSidebar} class="btn">Sidebar Item 1</a></li>
			<li>
				<a href="/logout" class="btn btn-error text-white btn-outline" on:click={closeSidebar}
					>Keluar</a
				>
			</li>
		</ul>
	</div>
</div>
