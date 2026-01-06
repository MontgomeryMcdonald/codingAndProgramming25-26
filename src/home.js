import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import data from './data'

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Main from './components/Main'
import BusinessPage from './components/BusinessPage';
import Map from './components/Map'
import Section from './components/Section'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Section />

  </React.StrictMode>
);
