# Test and learn map

## Change GEOJSON

Replace the file `public/tl.geojson` with the new file.

If any new categories have been added, the `src/lib/colors.js` file need to be updated.

## Setup

```
npm install
```

## Build

```
npm run build
```

## Deploy

Make sure you add the environment variable with the mapbox token:
```
VITE_MAPBOX_ACCESS_TOKEN=insert-token-from-mapbox-here
```

Base directory: `/`
Output directory: `/dist`
