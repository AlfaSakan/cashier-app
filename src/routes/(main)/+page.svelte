<script lang="ts">
	import { ChartArea } from '$lib/client/components';
	import { convertTransactionToChart } from '$lib/client/utils/chart.util';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	$: transactions = data.transactions;
</script>

{#if transactions.length > 0}
	<ChartArea data={convertTransactionToChart(transactions)} />
{:else}
	<div class="border rounded-lg py-20 text-center">
		<h3 class="text-2xl font-bold">Belum ada transaksi</h3>
	</div>
{/if}
