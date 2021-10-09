import React from 'react';
import {
	Fab
} from '@material-ui/core';
import {
	LocationSearching
} from '@material-ui/icons';

import { SearchDialog } from './Search';

import '../public/style.scss';
import maplibregl from 'maplibre-gl';

import { metropolisList } from './utils';
// 'cz' | 'sk' | 'us' | 'de' | 'gb' | 'jp'

export const Map: React.FunctionComponent = () => {
	const mapRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const map = new maplibregl.Map({
			container: mapRef.current,
			style: "https://tile.openstreetmap.jp/styles/osm-bright/style.json",
			accessToken: "",
			center: metropolisList.jp.location,
			zoom: 5
		});
		map.addControl(new maplibregl.GeolocateControl({}));
		map.addControl(new maplibregl.NavigationControl({}));
	}, []);

	return (
		<main>
			<div id="myMap" ref={mapRef}></div>
			<SearchDialog>
				<Fab variant="extended" id="faButton">
					<LocationSearching />
					Search
				</Fab>
			</SearchDialog>
		</main>
	)
}