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


  return (
    <>
      <div className="layout bg-gradient-to-br from-[#00A2D3] to-white dark:from-[#00A2D3] dark:to-black min-h-screen dark:text-[#00A9DC] text-black">
        {/* Add dark mode later */}
        <Navbar />
        <div className="banner bg-[#00536D]">
          <Grid />
          <div
            className="sub-info-one sub-info"
            style={{
              backgroundColor: "#006D8F",
              color: "hsl(210, 40%, 98%)",
            }}
          >
            Businesses: 15
          </div>
          <div className="sub-info sub-info-two dark:text-black ">User Count: 97</div>
          <div className="sub-info sub-info-three dark:text-black">Testimonial Average: 4.7 Stars</div>
          <h1 className="banner-head">
            all the greatest {" "}
            <span style={{ color: "hsl(221, 83%, 53%)" }}>
              local businesses
            </span>
            , built for everyday people.
          </h1>
          <p className="banner-info dark:text-gray-400 text-gray-500">
            Browse featured products, add a local business to join our legion,
            and leave a testimonial. Everything here is built by locals
          </p>
          <NavLink className="shop-products" to={'/products'}>
            <p>View All Businesses</p> <FaArrowRight></FaArrowRight>
          </NavLink>
          <NavLink className="shop-custom dark:text-black " to={'/custom-order'}>
            {" "}
            <p>Add a Business</p> <FaWandMagicSparkles />
          </NavLink>

          <div className="info-blurb info-blurb-one">
            <LuSparkles
              className="icon"
              style={{ color: "hsl(221, 83%, 53%)" }}
            />{" "}
            <div className="info-blurb-stacked">
              <p className="info-blurb-sub">Local Support</p>{" "}
              <h3 className="info-blurb-description">
                Support Small Businesses
              </h3>{" "}
            </div>
          </div>
          <div className="info-blurb info-blurb-two">
            <FaClipboardList
              className="icon"
              style={{ color: "hsl(221, 83%, 53%)" }}
            />{" "}
            <div className="info-blurb-stacked">
              <p className="info-blurb-sub">Made to be</p>{" "}
              <h3 className="info-blurb-description">
                Business Where It Matters -- Locally
              </h3>{" "}
            </div>
          </div>
          <div className="info-blurb info-blurb-three">
            <PiStudentBold
              className="icon"
              style={{ color: "hsl(221, 83%, 53%)" }}
            />{" "}
            <div className="info-blurb-stacked">
              <p className="info-blurb-sub">Buy ad space</p>{" "}
              <h3 className="info-blurb-description">
                Promote All You Need
              </h3>{" "}
            </div>
          </div>
          
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
