<script lang="ts">
	import EyeOff from '../../Icons/EyeOff.svelte';
	import EyeOn from '../../Icons/EyeOn.svelte';

	export let label: string;
	export let name: string;
	export let error = '';
	export let placeholder = '';
	export let value: string | number = '';
	export let disabled = false;
	export let min: number | undefined = undefined;

	let isShow = false;

	function togglePassword() {
		isShow = !isShow;
	}
</script>

<div class="form-control w-full">
	<label for={name} class="label">
		<span class="label-text font-semibold">{label}</span>
		<!-- <span class="label-text-alt">Alt label</span> -->
	</label>
	<div class="input input-bordered w-full flex items-center gap-2 pl-0">
		<input
			class="flex-1 flex bg-transparent h-full pl-4 outline-none"
			type={isShow ? 'text' : 'password'}
			{placeholder}
			id={name}
			{name}
			{value}
			{disabled}
			{min}
			on:change
		/>
		<button type="button" on:click={togglePassword}>
			{#if isShow}
				<EyeOn height="20" width="20" />
			{:else}
				<EyeOff height="20" width="20" />
			{/if}
		</button>
	</div>
	<label for={name} class="label">
		<span class="label-text-alt text-error">{error ? error : ''}</span>
	</label>
</div>
