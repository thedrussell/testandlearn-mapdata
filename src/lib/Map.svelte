<script>
	import { onMount } from 'svelte';
	import Filters from './Filters.svelte';
	import { createMap } from './map.js';
	import 'mapbox-gl/dist/mapbox-gl.css';

	let map;
	let trials = $state([]);
	let providers = $state([]);
	let features;

	const onFeatures = (features) => {
		console.log('got features', features);
		const trialsSet = new Set();
		for (let feature of features) {
			trialsSet.add(feature.properties.Trial);
		}
		trials = Array.from(trialsSet);

		const providersSet = new Set();
		for (let feature of features) {
			providersSet.add(feature.properties.Provider);
		}
		providers = Array.from(providersSet);
	};

	onMount(() => {
		map = createMap({ onFeatures });
	});

	const handleFilterUpdate = (data) => {
		map.updateFilter(data);
	};

</script>

<div class="Map">
	<div class="Map__map" id="mapboxgl-map"></div>
	<div class="Map__filters">
		<Filters onUpdate={handleFilterUpdate} {trials} {providers} />
	</div>
</div>

<style>
	.Map {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.Map__map {
		width: 100%;
		height: 100%;
	}
	.Map__filters {
	}
</style>