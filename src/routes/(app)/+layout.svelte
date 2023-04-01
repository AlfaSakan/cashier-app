<script lang="ts">
	import { HeaderNavigation } from '$lib/client/components';
	import { Toaster } from 'svelte-french-toast';
</script>

<div class="drawer drawer-mobile">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Page content here -->
		<HeaderNavigation backIcon rightIcon={false} />
		<div class="flex flex-col p-4 mb-16">
			<slot />
		</div>
		<Toaster />
	</div>
</div>
