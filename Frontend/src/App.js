import React, { Component } from 'react';
import './App.css';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
// import { CookiesProvider } from 'react-cookie';
// import { Provider } from 'react-redux'
// import storeAndPersistor from './reduxConfig/store'
// import persistor from './reduxConfig/store'

//App Component
class App extends Component {
  render() {
    return (


      <BrowserRouter>

        <Main />

      </BrowserRouter>


    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
