<script lang="ts">
	import BagShopping from '../../Icons/BagShopping.svelte';
	import Chart from '../../Icons/Chart.svelte';
	import Home from '../../Icons/Home.svelte';
	import Person from '../../Icons/Person.svelte';

	export let currentPage = '/';
</script>

<div class="btm-nav bg-base-200">
	<a
		type="button"
		class={currentPage === '/' ? 'active bg-inherit border-primary border-t-4' : ''}
		href="/"
	>
		<Home />
	</a>
	<a
		type="button"
		class={currentPage === '/store' ? 'active bg-inherit border-primary border-t-4' : ''}
		href="/store"
	>
		<BagShopping />
	</a>
	<a
		type="button"
		class={currentPage === '/history-transaction'
			? 'active bg-inherit border-primary border-t-4'
			: ''}
		href="/history-transaction"
	>
		<Chart />
	</a>
	<button>
		<Person />
	</button>
</div>
