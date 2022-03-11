import React from 'react';
import {
	Fab
} from '@material-ui/core';
import {
	LocationSearching
} from '@material-ui/icons';

import { SearchDialog } from './Search';
import { GeoSearchUserData, GeoSearchCountries } from '@coex/geosearch/interface';

import '../public/style.scss';
import maplibregl from 'maplibre-gl';

import { metropolisList } from './utils';
import Map from 'maplibre-gl/types/ui/map';

export const MyMap: React.FunctionComponent = () => {
	const mapRef = React.useRef<HTMLDivElement>(null);
	let map: Map;
	let onSearchResultSet = (args: GeoSearchUserData) => {
		const popup = new maplibregl.Popup({})
		popup.setHTML(`<h3>${args.suggestFirstRow}</h3><h4>(${args.suggestSecondRow})</h4><p>${args.latitude}, ${args.longitude}</p>`);
		popup.setLngLat({
			lat: args.latitude,
			lng: args.longitude
		});
		const marker = new maplibregl.Marker({});
		marker.setLngLat({
			lat: args.latitude,
			lng: args.longitude
		});
		marker.setPopup(popup);
		marker.addTo(map);
	};

	const onCountrySelectionChanged = (country: GeoSearchCountries) => {
		const latLng = metropolisList[country].location;
		map.flyTo({
			center: [latLng.lng, latLng.lat],
			zoom: 9
		});
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
			<SearchDialog onResultDataSet={onSearchResultSet} onCountrySelectionChanged={onCountrySelectionChanged}>
				<Fab variant="extended" id="faButton">
					<LocationSearching />
					Search
				</Fab>
			</SearchDialog>
		</main>
	)
}