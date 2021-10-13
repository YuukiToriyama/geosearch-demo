import React from 'react';
import ReactDOM from 'react-dom';

import { Header } from './Header';
import { MyMap } from './Map';

const App: React.FunctionComponent = () => {
	return (
		<React.Fragment>
			<Header />
			<MyMap />
		</React.Fragment>
	)
}

ReactDOM.render(<App />, document.getElementById("app"));