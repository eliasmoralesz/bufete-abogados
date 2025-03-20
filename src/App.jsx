import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Formal from './pages/Formal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formal" element={<Formal />} />
      </Routes>
    </Router>
  );
}

export default App;