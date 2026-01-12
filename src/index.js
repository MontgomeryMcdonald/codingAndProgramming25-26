import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// mongoose
  // import mongoose from 'mongoose';
  // import Business from '../models/business' 
  // import MenuData from '../models/menu' 
  // import Review from '../models/review' 

    // Business.create()



import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Main from './components/Main'
import BusinessPage from './components/BusinessPage';
import Map from './components/Map'
import Section from './components/Section'

const data =
{

  

}

// mongoose.connect(process.env.MONGODB_URI)
//         .then(()=> console.log('Database connected'))
//         .catch ((err)=> console.error("MongoDB Connection error: ", err))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Main data={data}/> 

  </React.StrictMode>
);

