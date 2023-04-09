<script lang="ts">
	import { HeaderNavigation, SidebarNavigation } from '$lib/client/components';
	import { themeStore } from '$lib/client/store/theme.store';
	import { Toaster } from 'svelte-french-toast';

	let inputRef: HTMLInputElement;
	$: checkedTheme = $themeStore === 'emerald';

	function closeSidebar() {
		inputRef.checked = false;
	}

	function handleThemeToggle() {
		const dataTheme = checkedTheme ? 'dark' : 'emerald';
		document.documentElement.setAttribute('data-theme', dataTheme);
		localStorage.setItem('data-theme', dataTheme);
		$themeStore = dataTheme;
	}
</script>

<div class="drawer drawer-mobile">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Page content here -->
		<HeaderNavigation backIcon rightIcon={false} />
		<div class="flex flex-col p-4 mb-16">
			<slot />
		</div>
		<Toaster />
	</div>

	<SidebarNavigation {closeSidebar} onThemeToggle={handleThemeToggle} {checkedTheme} />
</div>
