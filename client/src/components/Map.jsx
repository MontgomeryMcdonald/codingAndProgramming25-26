import React from 'react'
import {useState, useEffect, useRef} from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import leaflet from 'leaflet'

const Map = () => {
  const mapRef = useRef
  useEffect(() => {
  mapRef.current = leaflet.map('map').setView([33.44, -112.07], 13);

  leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mapRef.current);



  }, [])
  


  return (
    <div id='map'></div>
    
  )
}

export default Map