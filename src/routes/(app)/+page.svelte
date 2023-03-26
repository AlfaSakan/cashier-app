<script lang="ts">
	import { ChartArea } from '$lib/client/components';
	import { convertTransactionToChart } from '$lib/client/utils/chart.util';
	import toast from 'svelte-french-toast';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	$: transactions = data.transactions;
</script>

{#if transactions.length > 0}
	<ChartArea data={convertTransactionToChart(transactions)} />
{/if}
<h1 class="text-3xl font-bold underline">Hello world!</h1>
<button on:click={() => toast.success('Success')}>toast</button>
