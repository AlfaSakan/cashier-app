<script lang="ts">
	import { SwapTheme } from '../..';

	export let closeSidebar: () => void;
	export let onThemeToggle: () => void;
	export let checkedTheme = true;
</script>

<div class="drawer-side">
	<label for="my-drawer-2" class="drawer-overlay" />
	<ul class="menu p-4 w-80 bg-base-200 text-base-content gap-4 pt-20">
		<!-- Sidebar content here -->
		<!-- <div class="mt-20" /> -->
		<li>
			<SwapTheme checked={checkedTheme} on:click={onThemeToggle} />
		</li>
		<li>
			<a href="/warehouse" on:click={closeSidebar} class="btn btn-primary">Daftar Barang</a>
		</li>
		<li><a href="/" on:click={closeSidebar} class="btn btn-primary">Sidebar Item 1</a></li>
		<li>
			<a
				href="/logout"
				class="btn btn-error btn-outline"
				on:click={closeSidebar}
				data-testid="sidebar:button:logout">Keluar</a
			>
		</li>
	</ul>
</div>
