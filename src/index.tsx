import React from 'react';
import ReactDOM from 'react-dom';

import { Header } from './Header';
import { Map } from './Map';

const App: React.FunctionComponent = () => {
	return (
		<React.Fragment>
			<Header />
			<Map />
		</React.Fragment>
	)
}

ReactDOM.render(<App />, document.getElementById("app"));