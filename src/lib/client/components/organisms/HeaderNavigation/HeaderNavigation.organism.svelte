<script lang="ts">
	import BellNotif from '../../Icons/BellNotif.svelte';
	import Hamburger from '../../Icons/Hamburger.svelte';
	import Search from '../../Icons/Search.svelte';
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<label class="btn btn-ghost btn-circle" for="my-drawer-2">
			<Hamburger />
		</label>
	</div>
	<div class="navbar-center">
		<a class="btn btn-ghost normal-case text-xl" href="/">daisyUI</a>
	</div>
	<div class="navbar-end">
		<button class="btn btn-ghost btn-circle">
			<Search />
		</button>
		<button class="btn btn-ghost btn-circle">
			<div class="indicator">
				<BellNotif />
				<span class="badge badge-xs badge-primary indicator-item" />
			</div>
		</button>
	</div>
</div>
