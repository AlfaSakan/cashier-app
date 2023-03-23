<script lang="ts">
	export let label: string;
	export let name: string;
	export let error = '';
	export let placeholder = '';
	export let type: 'text' | 'number' | 'email' | 'password' | 'search' | 'url' = 'text';
	export let value: string | number = '';
	export let disabled = false;
	export let min: number | undefined = undefined;
</script>

<div class="form-control w-full">
	<label for={name} class="label">
		<span class="label-text font-semibold">{label}</span>
	</label>
	<div class="input input-bordered w-full flex items-center gap-2">
		<slot name="leading">
			<div class="hidden" />
		</slot>
		<input
			class="flex-1 flex bg-transparent h-full outline-none"
			{type}
			{placeholder}
			id={name}
			{name}
			{value}
			{disabled}
			{min}
			autocomplete="off"
			on:change
			on:input
		/>
		<slot name="trailing">
			<div class="hidden" />
		</slot>
	</div>
	<label for={name} class="label">
		<span class="label-text-alt text-error">{error ? error : ''}</span>
	</label>
</div>
