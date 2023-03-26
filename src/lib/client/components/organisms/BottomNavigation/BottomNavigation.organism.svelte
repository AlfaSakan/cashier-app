<script lang="ts">
	import BagShopping from '../../Icons/BagShopping.svelte';
	import Chart from '../../Icons/Chart.svelte';
	import Home from '../../Icons/Home.svelte';
	import Person from '../../Icons/Person.svelte';

	export let currentPage = '/';
</script>

<div class="btm-nav">
	<a type="button" class={currentPage === '/' ? 'active' : ''} href="/">
		<Home />
	</a>
	<a type="button" class={currentPage === '/warehouse' ? 'active' : ''} href="/warehouse">
		<BagShopping />
	</a>
	<a
		type="button"
		class={currentPage === '/history-transaction' ? 'active' : ''}
		href="/history-transaction"
	>
		<Chart />
	</a>
	<button>
		<Person />
	</button>
</div>
