import React, { createContext, useContext } from "react";
import {useState, useEffect} from 'react'
import Navbar from "../components/Navbar";
import Grid from "../components/grid";
import { FaArrowRight } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { LuSparkles } from "react-icons/lu";
import { FaClipboardList } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import Featured from "../components/featured";




const Home = () => {
 
const [items, setItems] = useState([])

    async function stuff(params) {
        const result = await fetch('http://localhost:5000/api/public/testimonials')
        var revised = await result.json()
        setItems(revised)
        console.log(items) 
    }
    
    async function stuff() {

        // prevent destroy
        const result = await fetch('http://localhost:5000/api/public/business/')
        var revised = await result.json()
        setItems(revised.data)
    }
    
    
    useEffect(() => {
        stuff()
    }, [])
    

  return (
    <>
      <div className="layout bg-gradient-to-br from-blue-200 to-white dark:from-blue-400 dark:via-black dark:to-black min-h-screen dark:text-white text-black">
        {/* Add dark mode later */}
        <Navbar />
        <div className="banner">
          <Grid />
          
          <p>{items.length}</p>

          
        </div>
        <footer>
            <p className="wer">@ 2026 West-MEC Student-made prints</p>
            <p className="admin-foot">Admin</p>
        </footer>

        <div className="scroll" style={{ height: "30vh", opacity: "0" }}>
          k
        </div>
      </div>
    </>
  );
};



export default Home;
