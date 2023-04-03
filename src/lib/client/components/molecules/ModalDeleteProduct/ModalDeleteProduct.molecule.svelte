<script lang="ts">
	import { Modal } from '../..';

	export let onCancel: () => void;
	export let onConfirm: () => void;
	export let productName: string;
</script>

<Modal>
	<div
		class="bg-base-100 w-4/5 h-1/4 rounded-lg p-4 flex flex-col"
		data-testid="modal-delete-product"
	>
		<h3 class="font-bold text-xl">Hapus Produk</h3>

		<p>Apakah kamu yakin ingin menghapus <span class="font-semibold">{productName}</span>?</p>
		<div class="grid grid-cols-2 gap-4 px-4 mt-auto">
			<button class="btn btn-outline" on:click={onCancel} data-testid="modal-delete-product:cancel"
				>Tidak</button
			>
			<button
				class="btn btn-error text-base-100"
				on:click={onConfirm}
				data-testid="modal-delete-product:confirm">Ya</button
			>
		</div>
	</div>
</Modal>
