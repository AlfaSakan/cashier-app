<script lang="ts">
	import { createId } from '@paralleldrive/cuid2';
	import { SwapTheme } from '../..';

	export let closeSidebar: () => void;
	export let onThemeToggle: () => void;
	export let checkedTheme = true;

	const items: { text: string; href: string; className: string; testID?: string }[] = [
		{ text: 'Profile', href: '/profile', className: 'btn btn-primary' },
		{ text: 'Daftar Barang', href: '/store', className: 'btn btn-primary' },
		{ text: 'Riwayat Transaksi', href: '/history-transaction', className: 'btn btn-primary' },
		{ text: 'Gudang', href: '/warehouse', className: 'btn btn-primary' },
		{
			text: 'Keluar',
			href: '/logout',
			className: 'btn btn-error btn-outline',
			testID: 'sidebar:button:logout'
		}
	];
</script>

<div class="drawer-side">
	<label for="my-drawer-2" class="drawer-overlay" />
	<ul class="menu p-4 w-80 bg-base-200 text-base-content gap-4">
		<!-- Sidebar content here -->
		<li>
			<a class="btn btn-ghost normal-case text-3xl h-fit py-0 hover:bg-transparent" href="/"
				>Aplikasi Kasir</a
			>
		</li>
		<div class="mt-10" />
		{#each items as item (createId())}
			<li>
				<a href={item.href} on:click={closeSidebar} class={item.className} data-testid={item.testID}
					>{item.text}</a
				>
			</li>
		{/each}
		<li class="mt-auto items-end">
			<SwapTheme checked={checkedTheme} on:click={onThemeToggle} />
		</li>
	</ul>
</div>
