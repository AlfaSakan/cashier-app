<script lang="ts">
	import { ChartArea } from '$lib/client/components';
	import { convertTransactionToChart } from '$lib/client/utils/chart.util';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	$: transactions = data.transactions;
</script>

{#if transactions.length > 0}
	<ChartArea data={convertTransactionToChart(transactions)} />
{/if}
