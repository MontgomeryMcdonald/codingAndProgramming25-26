import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Main from './components/Main'
import BusinessPage from './components/BusinessPage';
import Map from './components/Map'
import Section from './components/Section'
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    
    <Map/>
      

  // </React.StrictMode>
);

