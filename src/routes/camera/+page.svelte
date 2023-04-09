<script lang="ts">
	import { onMount } from 'svelte';

	let videoRef: HTMLVideoElement;
	let imgRef: HTMLImageElement;
	let track: MediaStreamTrack;
	let imageCapture: ImageCapture;
	let cameraAvailable: MediaDeviceInfo[] = [];

	async function gotDevices() {
		const devicesInfo = await navigator.mediaDevices.enumerateDevices();

		const arr: MediaDeviceInfo[] = [];

		devicesInfo.forEach((info) => {
			if (info.kind === 'videoinput') {
				arr.push(info);
			}
		});

		cameraAvailable = arr;
	}

	async function openCamera() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: false
			});
			const videoTracks = stream.getVideoTracks();
			track = videoTracks[0];
			imageCapture = new ImageCapture(track);
			videoRef.srcObject = stream;
		} catch (error) {
			console.warn('OPEN CAMERA', error);
		}
	}

	async function closeCamera() {
		try {
			track.stop();
			videoRef.srcObject = null;
			await navigator.mediaDevices.getUserMedia({
				video: false,
				audio: false
			});
		} catch (error) {
			console.warn('CLOSE CAMERA', error);
		}
	}

	function takePhoto() {
		imageCapture
			.takePhoto()
			.then(function (blob) {
				imgRef.classList.remove('hidden');
				imgRef.src = URL.createObjectURL(blob);
			})
			.catch(function (error) {
				console.warn('takePhoto() error: ', error);
			});
	}

	onMount(() => {
		gotDevices();
	});
</script>

<video autoplay bind:this={videoRef}>
	<track kind="captions" />
	Your browser does not support the video tag.
</video>
<img bind:this={imgRef} alt="not found" class="hidden" />

<select id="cameras">
	{#each cameraAvailable as camera (camera.deviceId)}
		<option value={camera.deviceId}>{camera.label}</option>
	{/each}
</select>

<p>{JSON.stringify(cameraAvailable)}</p>

<div class="flex flex-col gap-4">
	<button class="btn btn-primary" on:click={takePhoto}>Take Photo</button>
	<button class="btn btn-primary" on:click={openCamera}>Open Camera</button>
	<button class="btn btn-primary" on:click={closeCamera}>Close Camera</button>
</div>
