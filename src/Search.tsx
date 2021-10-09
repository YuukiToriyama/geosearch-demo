import React from 'react';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField
} from '@material-ui/core';

interface SearchDialogProps {
	children: React.ReactNode
}

export const SearchDialog = (props: SearchDialogProps) => {
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClickClose = () => {
		setOpen(false);
	};
	return (
		<React.Fragment>
			<div onClick={handleClickOpen}>
				{props.children}
			</div>
			<Dialog open={open} onClose={handleClickClose}>
				<DialogTitle>Search</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Find places all around the world!
					</DialogContentText>

					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Country, City, Town, Landmarks..."
						type="email"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClickClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	)
}