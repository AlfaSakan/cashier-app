<script lang="ts">
	import BagShopping from '../../Icons/BagShopping.svelte';
	import Chart from '../../Icons/Chart.svelte';

	import Home from '../../Icons/Home.svelte';
	import Person from '../../Icons/Person.svelte';
</script>

<div class="btm-nav">
	<a type="button" href="/">
		<Home />
	</a>
	<a type="button" class="active" href="/warehouse">
		<BagShopping />
	</a>
	<button>
		<Chart />
	</button>
	<button>
		<Person />
	</button>
</div>
