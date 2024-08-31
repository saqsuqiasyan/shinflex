import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import HomePage from './components/pages/HomePage';
import AbrasivesPage from './components/pages/AbrasivesPage';
import CutterToolsPage from './components/pages/CutterToolsPage';

const App = () => {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/abrasives" element={<AbrasivesPage />} />
        <Route path="/cutter-tools" element={<CutterToolsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
