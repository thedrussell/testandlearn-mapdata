import { Map, NavigationControl, Popup, LngLatBounds } from 'mapbox-gl';

export function createMap({ onFeatures }) {
	const map = new Map({
		container: 'mapboxgl-map',
		style: 'mapbox://styles/thedrussell2/cm3sxbdv8004a01si9shr8vtg',
		bounds: new LngLatBounds([-9, 49.5], [3, 59.5]),
		center: [-3, 54],
		zoom: 4.5,
		maxZoom: 14,
		minZoom: 3,
		accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
	});

	map.addControl(new NavigationControl({
		showCompass: false,
		showZoom: true,
	}));

	// (Optional) Add custom data (GeoJSON)
	map.on('load', function() {

		map.on('sourcedata', () => {
			onFeatures(map.querySourceFeatures('geojsondata'));
		});

		map.addSource('geojsondata', {
			'type': 'geojson',
			'data': '/tl.geojson' // Replace with your GeoJSON file URL
		});

		map.addLayer({
			'id': 'trials',
			'type': 'circle',
			'source': 'geojsondata',
			'paint': {
				'circle-radius': 5,
				'circle-color': [
					'match',
					['get', 'Trial'],
					'Outreach Health',
					'#2BACD0',
					'IPS',
					'#F7D461',
					'Personalised Budgets',
					'#F0706B',
					'Using Data to Prevent Homelessness',
					'#14B8A6',
					'Citadel',
					'#0C4A6E',
					'Systems-wide Evaluation',
					'#78716C',
					'Deep Dive Justice',
					'#047857',
					'Accommodate and Connect',
					'#FB923C',
					'Accommodation and Immigration Advice',
					'#BE185D',
					/* other */ '#E5E5E5'
					]
			}
		});
	});


	// When a click event occurs on a feature in the places layer, open a popup at the
	// location of the feature, with description HTML from its properties.
	map.on('click', 'trials', (ev) => {
		const coordinates = ev.features[0].geometry.coordinates.slice();
		const description = ev.features[0].properties.description;
		const info = {
			trial: ev.features[0].properties.Trial,
			provider: ev.features[0].properties.Provider,
			url: ev.features[0].properties.URL,
			onsCode: ev.features[0].properties.onsCode,
			area: ev.features[0].properties.Area,
		};

		const subtitle = info.provider === info.area ? `${info.provider}` : `${info.provider}, ${info.area}`;
		const contents = [
			`<div style="padding: 10px">`,
			`<div style="margin-bottom: 10px; margin-right: 10px;"><a style="color: #ee716c; font-size: 1rem; font-weight: 500; line-height: 1.5; display: block;" target="_blank" rel="noopener noreferrer" href="${info.url}">${info.trial}</a></div>`,
			`<div style="font-weight: normal; font-size: 0.8rem;">Area: ${info.area}</div>`,
			`<div style="font-weight: normal; font-size: 0.8rem;">Provided by: ${info.provider}</div>`,
			`</div>`,
		].join('');

		// Ensure that if the map is zoomed out such that multiple
		// copies of the feature are visible, the popup appears
		// over the copy being pointed to.
		if (['mercator', 'equirectangular'].includes(map.getProjection().name)) {
			while (Math.abs(ev.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += ev.lngLat.lng > coordinates[0] ? 360 : -360;
			}
		}

		new Popup()
			.setLngLat(coordinates)
			.setHTML(contents)
			.addTo(map)
		;
	});

	// Change the cursor to a pointer when the mouse is over the places layer.
	map.on('mouseenter', 'trials', () => {
		map.getCanvas().style.cursor = 'pointer';
	});

	// Change it back to a pointer when it leaves.
	map.on('mouseleave', 'trials', () => {
		map.getCanvas().style.cursor = '';
	});

	function updateFilter(data) {
		console.log('update filter!', Array.from(data));
		if (data.length) {
			map.setFilter('trials', ['in', 'Trial', ...data]);
		} else {
			map.setFilter('trials', null);
		}
	}

	return {
		map,
		updateFilter,
	};
}