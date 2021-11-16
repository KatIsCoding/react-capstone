import React from 'react';
import './App.css';
import Navbar from "react-bootstrap/Navbar"
import { HiArrowSmLeft } from "react-icons/hi"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home"

const App = () => (
  <main>
    <Navbar bg="dark" variant="dark">
      <HiArrowSmLeft className="navbar-brand" size={40} />
      <Navbar.Brand href="#home">
        Covid-19 Tracker
      </Navbar.Brand>
    </Navbar>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </Router>

  </main>
);

export default App;
