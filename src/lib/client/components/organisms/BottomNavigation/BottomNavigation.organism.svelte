<script lang="ts">
	import { bottomItems } from './bottomItems';

	export let currentPage = '/';
</script>

<div class="btm-nav bg-base-200">
	{#each bottomItems as item, index (index)}
		<a
			type="button"
			class={currentPage === item.route ? 'active bg-inherit border-primary border-t-4' : ''}
			href={item.route}
			data-testid={item.testid}
		>
			<svelte:component this={item.icon} />
		</a>
	{/each}
</div>
