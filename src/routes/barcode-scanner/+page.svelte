<script lang="ts">
	import { goto } from '$app/navigation';
	import { Html5Qrcode } from 'html5-qrcode';
	import type { Html5QrcodeResult } from 'html5-qrcode/esm/core';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';

	export let data: PageData;
	$: user = data.user;

	let html5Qrcode: Html5Qrcode;

	onMount(() => {
		init();

		return stop;
	});

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
		start();
	}

	function start() {
		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 250, height: 250 },
				aspectRatio: 2
			},
			onScanSuccess,
			onScanFailure
		);
	}

	async function stop() {
		await html5Qrcode.stop();
	}

	function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
		if (user === null) {
			alert(`Code matched = ${decodedText}`);
			return;
		}

		goto(`/add-product?barcode=${decodedText}`);
	}

	function onScanFailure(error: string) {
		toast.error(error);
	}
</script>

<main class="flex flex-col items-center justify-center gap-5">
	<div id="reader" class="w-full h-screen lg:h-fit bg-black" />
	<button
		class="btn btn-primary"
		on:click={() => {
			goto('/add-product?barcode=123123');
		}}
	>
		add product
	</button>
</main>
