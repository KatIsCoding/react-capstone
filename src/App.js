import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import { HiArrowSmLeft } from 'react-icons/hi';
import {
  BrowserRouter as Router, Routes, Route, useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/Home';
import Details from './components/Details';
import { toggleBackButton } from './redux/cases/cases';

const NavigationBar = () => {
  const { backButton } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useNavigate();
  const currentStyle = { display: 'none' };
  if (backButton) {
    currentStyle.display = 'block';
  } else {
    currentStyle.display = 'none';
  }
  return (
    <Navbar className="navbar" variant="dark">
      <HiArrowSmLeft style={currentStyle} className="navbar-brand" size={40} onClick={() => { history(-1); dispatch(toggleBackButton(toggleBackButton())); }} />
      <Navbar.Brand>
        Covid-19 Tracker
      </Navbar.Brand>
    </Navbar>
  );
};

const App = () => (
  <main>
    <Router basename={process.env.PUBLIC_URL}>
      <NavigationBar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/details/:countryId" element={<Details />} />

      </Routes>
    </Router>

  </main>
);

export default App;
