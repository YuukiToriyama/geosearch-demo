import React from 'react';
import {
	Fab
} from '@material-ui/core';
import {
	LocationSearching
} from '@material-ui/icons';

import { SearchDialog, SearchResult } from './Search';

import '../public/style.scss';
import maplibregl from 'maplibre-gl';

import { metropolisList } from './utils';

export const Map: React.FunctionComponent = () => {
	const mapRef = React.useRef<HTMLDivElement>(null);
	let map;
	let onSearchResultSet = (args: SearchResult) => {
		const popup = new maplibregl.Popup({})
		popup.setHTML(`<h3>${args.label}</h3><h4>(${args.subLabel})</h4><p>${args.lat}, ${args.lng}</p>`);
		popup.setLngLat({
			lat: args.lat,
			lng: args.lng
		});
		const marker = new maplibregl.Marker({});
		marker.setLngLat({
			lat: args.lat,
			lng: args.lng
		});
		marker.setPopup(popup);
		marker.addTo(map);
	};

	React.useEffect(() => {
		map = new maplibregl.Map({
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
			<SearchDialog onResultDataSet={onSearchResultSet}>
				<Fab variant="extended" id="faButton">
					<LocationSearching />
					Search
				</Fab>
			</SearchDialog>
		</main>
	)
}