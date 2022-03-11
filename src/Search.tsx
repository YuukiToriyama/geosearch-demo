import React from 'react';

import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	InputLabel,
	MenuItem,
	Select,
	Snackbar,
	TextField
} from '@material-ui/core';
import { GeoSearch } from '@coex/geosearch';

export interface SearchResult {
	label: string
	subLabel: string
	lat: number
	lng: number
}
interface SearchDialogProps {
	children: React.ReactNode
	onResultDataSet: (resultData: SearchResult) => void
}

export const SearchDialog = (props: SearchDialogProps) => {
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClickClose = () => {
		setOpen(false);
	};

	const [snackbarOpen, setSnackbarOpen] = React.useState(false);

	type GeoSearchCountries = 'cz' | 'sk' | 'de' | 'us' | 'gb' | 'jp' | null;
	const [searchArea, setSearchArea] = React.useState<GeoSearchCountries>(null);
	type GeoSearchLanguages = 'en' | 'cs' | 'de' | 'pl' | 'sk' | 'ru' | 'es' | 'fr';
	const [resultLanguage, setResultLanguage] = React.useState<GeoSearchLanguages>("en");
	type GeoSearchScope = 'muni' | 'area' | 'pubt' | 'street' | null;
	const [scope, setScope] = React.useState<GeoSearchScope>(null);
	const [keyword, setKeyword] = React.useState("");

	const handleButtonClicked = async () => {
		const geoSearch = new GeoSearch();
		const result = await geoSearch.suggest(keyword, {
			scope: scope,
			country: searchArea,
			lang: resultLanguage
		});
		if (result.length > 0) {
			console.log(result);
			result.forEach(location => {
				const locationData = location.userData;
				props.onResultDataSet({
					label: locationData.suggestFirstRow,
					subLabel: locationData.suggestSecondRow,
					lat: locationData.latitude,
					lng: locationData.longitude
				});
			});
			handleClickClose();
		} else {
			setSnackbarOpen(true);
		}
	}
	return (
		<React.Fragment>
			<div onClick={handleClickOpen}>
				{props.children}
			</div>
			<Dialog open={open} onClose={handleClickClose}>
				<DialogTitle>Search</DialogTitle>
				<DialogContent>
					<InputLabel id="country-select-label">You can choose search area</InputLabel>
					<Select
						labelId="country-select-label"
						label="Country"
						value={searchArea}
						onChange={event => setSearchArea(event.target.value as GeoSearchCountries)}
					>
						<MenuItem value={null}>🗺️ World</MenuItem>
						<MenuItem value="cz">🇨🇿 Czechia</MenuItem>
						<MenuItem value="sk">🇸🇰 Slovakia</MenuItem>
						<MenuItem value="us">🇺🇸 United States of America</MenuItem>
						<MenuItem value="de">🇩🇪 Germany</MenuItem>
						<MenuItem value="gb">🇬🇧 United Kingdom of Great Britain and Northern Ireland</MenuItem>
						<MenuItem value="jp">🇯🇵 Japan</MenuItem>
					</Select>

					<InputLabel id="language-select-label">Search result will show in language you choose</InputLabel>
					<Select
						labelId="language-select-label"
						label="Result Language"
						value={resultLanguage}
						onChange={event => setResultLanguage(event.target.value as GeoSearchLanguages)}
					>
						<MenuItem value="en">English</MenuItem>
						<MenuItem value="cs">Czech</MenuItem>
						<MenuItem value="de">German</MenuItem>
						<MenuItem value="pl">Polish</MenuItem>
						<MenuItem value="sk">Slovak</MenuItem>
						<MenuItem value="ru">Russian</MenuItem>
						<MenuItem value="es">Spanish</MenuItem>
						<MenuItem value="fr">French</MenuItem>
					</Select>
					<InputLabel id="scope-select-label">Choose category you want to find</InputLabel>
					<Select
						labelId="scope-select-label"
						label="Search Category"
						value={scope}
						onChange={event => setScope(event.target.value as GeoSearchScope)}
					>
						<MenuItem value={null}></MenuItem>
						<MenuItem value="muni">municipal</MenuItem>
						<MenuItem value="area">area</MenuItem>
						<MenuItem value="pubt">region</MenuItem>
						<MenuItem value="street">street</MenuItem>
					</Select>
					<InputLabel id="search-word-label">Type keyword and click search button</InputLabel>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						type="email"
						fullWidth
						variant="standard"
						value={keyword}
						onChange={event => setKeyword(event.target.value)}
					/>
					<Button
						variant="contained"
						size="large"
						onClick={handleButtonClicked}
					>Search</Button>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClickClose}>Close</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={() => setSnackbarOpen(false)}
			>
				<Alert severity="error">No result</Alert>
			</Snackbar>
		</React.Fragment>
	)
}