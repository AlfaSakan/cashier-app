<script lang="ts">
	export let label: string;
	export let name: string;
	export let error = '';
	export let placeholder = '';
	export let value = '';
	export let disabled = false;
</script>

<div class="form-control w-full">
	<label for={name} class="label">
		<span class="label-text font-semibold">{label}</span>
	</label>
	<textarea
		{placeholder}
		class="textarea textarea-bordered h-24 w-full resize-none focus:outline-none focus:outline-offset-0"
		id={name}
		{name}
		{value}
		{disabled}
	/>
	<label for={name} class="label">
		<span class="label-text-alt text-error">{error ? error : ''}</span>
	</label>
</div>
