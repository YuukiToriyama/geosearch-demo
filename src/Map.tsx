import React from 'react';
import {
	Fab
} from '@material-ui/core';
import {
	LocationSearching
} from '@material-ui/icons';


import '../public/style.scss';
import maplibregl from 'maplibre-gl';

export const Map: React.FunctionComponent = () => {
	const mapRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const map = new maplibregl.Map({
			container: mapRef.current,
			style: "https://tile.openstreetmap.jp/styles/osm-bright/style.json",
			accessToken: ""
		});
		map.addControl(new maplibregl.GeolocateControl({}));
		map.addControl(new maplibregl.NavigationControl({}));
	})
	return (
		<main>
			<div id="myMap" ref={mapRef}></div>
			<Fab variant="extended" id="faButton" >
				<LocationSearching />
				Search
			</Fab>
		</main>
	)
}