<script lang="ts">
	import { ListTileTransaction } from '$lib/client/components';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	$: transactions = data.transactions;
</script>

{#if transactions.length > 0}
	<div class="flex flex-col gap-4">
		{#each transactions as transaction (transaction.id)}
			<ListTileTransaction href="/transaction/{transaction.id}" {transaction} />
		{/each}
	</div>
{:else}
	<div class="min-h-[30rem] flex text-current items-center justify-center text-2xl font-medium">
		<p>Belum ada riwayat transaksi</p>
	</div>
{/if}
