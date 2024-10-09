import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import AbrasivesPage from './components/pages/AbrasivesPage';
import CutterToolsPage from './components/pages/CutterToolsPage';
import Loading from './components/loading/Loading';
import Footer from './components/footer/Footer';
import Home from './components/pages/HomePage/HomePage';
import Err404 from './components/pages/err404.jsx';
import Login from './components/header/Login/Login.jsx';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="*" element={<Err404 />} />
        <Route path="/" element={<Home />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/abrasives" element={<AbrasivesPage />} />
        <Route path="/cutter-tools" element={<CutterToolsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
