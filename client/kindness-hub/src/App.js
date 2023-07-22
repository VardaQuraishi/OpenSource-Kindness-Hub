// App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import Routes from './Routes';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Routes />
      </div>
    </BrowserRouter>
  );
};

export default App;
