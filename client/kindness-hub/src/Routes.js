// Routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Make sure to include 'Routes' in the import
import Home from './components/Home';
import CompletedActs from './components/CompletedActs';
import GenerateRandomAct from './components/GenerateRandomAct';
import ListOfRandomActs from './components/ListOfRandomActs';

const AppRoutes = () => { // Use a different name for the component (e.g., AppRoutes)
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/completed-acts" element={<CompletedActs />} />
      <Route path="/generate-random-act" element={<GenerateRandomAct />} />
      <Route path="/list-of-random-acts" element={<ListOfRandomActs />} />
    </Routes>
  );
};

export default AppRoutes;
