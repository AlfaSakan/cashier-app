<script lang="ts">
	import BellNotif from '../../Icons/BellNotif.svelte';
	import ChevronLeft from '../../Icons/ChevronLeft.svelte';
	import Hamburger from '../../Icons/Hamburger.svelte';
	import Search from '../../Icons/Search.svelte';

	export let backIcon = false;
	export let rightIcon = true;

	function handleBack() {
		history.back();
	}
</script>

<div class="navbar bg-base-100 border-b sticky top-0 border-base-200">
	<div class="navbar-start">
		{#if backIcon}
			<button class="btn btn-ghost btn-circle" on:click={handleBack} data-testid="header:back">
				<ChevronLeft width="24" height="24" />
			</button>
		{:else}
			<label class="btn btn-ghost btn-circle" for="my-drawer-2" data-testid="header:hamburger">
				<Hamburger />
			</label>
		{/if}
	</div>
	<div class="navbar-center">
		<a class="btn btn-ghost normal-case text-xl" href="/">Aplikasi Kasir</a>
	</div>
	<div class="navbar-end">
		{#if rightIcon}
			<button class="btn btn-ghost btn-circle">
				<Search />
			</button>
			<button class="btn btn-ghost btn-circle">
				<div class="indicator">
					<BellNotif />
					<span class="badge badge-xs badge-primary indicator-item bg-primary border-primary" />
				</div>
			</button>
		{/if}
	</div>
</div>
