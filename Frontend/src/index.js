import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import registerServiceWorker from './registerServiceWorker';

//render App component on the root element
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
