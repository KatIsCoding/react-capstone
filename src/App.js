import React, { useEffect } from 'react';
import './App.css';
import Navbar from "react-bootstrap/Navbar"
import { HiArrowSmLeft } from "react-icons/hi"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home"
import Details from "./components/Details"
import { getCasesFunction } from "./redux/cases/cases";

const App = () => {
  const dispatch = useDispatch();
  const { total } = useSelector(state => state);
  useEffect(() => {
    dispatch(getCasesFunction());
  }, [dispatch]);
  return (
  <main>
    <Navbar bg="dark" variant="dark">
      <HiArrowSmLeft className="navbar-brand" size={40} />
      <Navbar.Brand href="#home">
        Covid-19 Tracker
      </Navbar.Brand>
    </Navbar>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home total={total}/>} />
        <Route path="/details/:countryId" element={<Details />}/>
        
      </Routes>
    </Router>

  </main>
)}

export default App;
