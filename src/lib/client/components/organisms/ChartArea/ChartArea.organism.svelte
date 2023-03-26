<script lang="ts">
	import { generateTicks } from '$lib/client/utils/number.util';
	import type { ChartType } from '$lib/client/utils/types.util';
	import { scaleLinear } from 'd3-scale';

	export let data: ChartType[];

	const { xTicks, yTicks } = generateTicks(data);
	const padding = { top: 20, right: 15, bottom: 20, left: 25 };

	let width = 500;
	let height = 200;

	$: minX = data[0].x;
	$: maxX = data[data.length - 1].x;

	$: xScale = scaleLinear()
		.domain([minX, maxX])
		.range([padding.left, width - padding.right]);
	$: yScale = scaleLinear()
		.domain([Math.min.apply(null, yTicks), Math.max.apply(null, yTicks)])
		.range([height - padding.bottom, padding.top]);

	$: path = `M${data.map((p) => `${xScale(p.x)},${yScale(p.y)}`).join('L')}`;
	$: area = `${path}L${xScale(maxX)},${yScale(0)}L${xScale(minX)},${yScale(0)}Z`;
</script>

<h2 class="w-full max-w-lg mx-auto">Arctic sea ice minimum</h2>

<div class="w-full max-w-lg mx-auto" bind:clientWidth={width} bind:clientHeight={height}>
	<svg class="relative w-full h-[200px] overflow-visible">
		<!-- y axis -->
		<g transform="translate(0, {padding.top})">
			{#each yTicks as tick, index}
				<g
					class="text-sm font-extralight tick-{tick}"
					transform="translate(0, {yScale(tick) - padding.bottom})"
				>
					<line x2="100%" stroke-dasharray={index === 0 ? 0 : 2} class="stroke-gray-900" />
					<text y="-4" class="fill-gray-800 text-xs font-medium" text-anchor="start">{tick}rb</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g>
			{#each xTicks as tick, index}
				<g
					class="text-sm font-extralight tick-{tick}"
					transform="translate({xScale(tick)},{height})"
				>
					<line
						y1="-{height}"
						y2="-{padding.bottom}"
						x1="0"
						x2="0"
						stroke-dasharray={index === 0 ? 0 : 2}
						class="stroke-gray-900"
					/>
					<text y="-2" class="fill-gray-800" text-anchor="middle"
						>{new Date(tick * 1000).getDate() + ' Januari'}</text
					>
				</g>
			{/each}
		</g>

		<!-- data -->
		<path class="path-area" d={area} />
		<path
			class="fill-none stroke-green-900 stroke-2"
			stroke-linejoin="round"
			stroke-linecap="round"
			d={path}
		/>
	</svg>
</div>

<p class="w-full max-w-lg mx-auto">
	Average September extent. Source: <a href="https://climate.nasa.gov/vital-signs/arctic-sea-ice/">
		NSIDC/NASA
	</a>
</p>

<style>
	.path-area {
		fill: rgba(0, 100, 100, 0.2);
	}
</style>
