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
  const [featured, setFeatured] = useState([])
  let count = 0
  const findFeatured = async () => {
    let yab = await fetch('http://localhost:5000/api/public/products')
    // const featuredProducts = yab.filter((x) => x.featured == true)
    yab = await yab.json()
    let featured = yab.filter((x) => x.featured == true)
    let random = Math.floor((Math.random() * (featured.length-4))+1)
    featured = featured.splice(random,4)
    console.log(featured) 
    return featured
    
}
const [items, setItems] = useState([])
    async function stuff(params) {
        const result = await fetch('http://localhost:5000/api/public/testimonials')
        var revised = await result.json()
        setItems(revised)
        console.log(items) 
    }
useEffect( () => {
  async function doStuff() {
    var stuff = await findFeatured()
    console.log(typeof stuff)
    setFeatured(stuff)
  }
  stuff()
  doStuff()
}, [])


  return (
    <>
      <div className="layout bg-gradient-to-br from-blue-200 to-white dark:from-blue-400 dark:via-black dark:to-black min-h-screen dark:text-white text-black">
        {/* Add dark mode later */}
        <Navbar />
        <div className="banner">
          <Grid />
          <div
            className="sub-info-one sub-info"
            style={{
              backgroundColor: "hsl(221, 83%, 53%)",
              color: "hsl(210, 40%, 98%)",
            }}
          >
            Innovative
          </div>
          <div className="sub-info sub-info-two dark:text-black">Fast turnaround</div>
          <div className="sub-info sub-info-three dark:text-black">Student-made 3d prints</div>
          <h1 className="banner-head">
            West-MEC student-made{" "}
            <span style={{ color: "hsl(221, 83%, 53%)" }}>
              3D printed items
            </span>
            , built for everyday use.
          </h1>
          <p className="banner-info dark:text-gray-400 text-gray-500">
            Browse featured products, request custom prints (STL/ZIP uploads),
            and leave a testimonial. Everything here is built by
            students-designed, printed, and finished with care
          </p>
          <NavLink className="shop-products" to={'/products'}>
            <p>Shop Products</p> <FaArrowRight></FaArrowRight>
          </NavLink>
          <NavLink className="shop-custom dark:text-black" to={'/custom-order'}>
            {" "}
            <p>Custom Order</p> <FaWandMagicSparkles />
          </NavLink>

          <div className="info-blurb info-blurb-one">
            <LuSparkles
              className="icon"
              style={{ color: "hsl(221, 83%, 53%)" }}
            />{" "}
            <div className="info-blurb-stacked">
              <p className="info-blurb-sub">Clean finishes</p>{" "}
              <h3 className="info-blurb-description">
                Student QC + careful post-processing
              </h3>{" "}
            </div>
          </div>
          <div className="info-blurb info-blurb-two">
            <FaClipboardList
              className="icon"
              style={{ color: "hsl(221, 83%, 53%)" }}
            />{" "}
            <div className="info-blurb-stacked">
              <p className="info-blurb-sub">Made to spec</p>{" "}
              <h3 className="info-blurb-description">
                Color, material, size preferences
              </h3>{" "}
            </div>
          </div>
          <div className="info-blurb info-blurb-three">
            <PiStudentBold
              className="icon"
              style={{ color: "hsl(221, 83%, 53%)" }}
            />{" "}
            <div className="info-blurb-stacked">
              <p className="info-blurb-sub">Small batches</p>{" "}
              <h3 className="info-blurb-description">
                Perfect for clubs & events
              </h3>{" "}
            </div>
          </div>
          
        </div>

        <div className="featured">
          <Grid />
          <h1 className="sub-header">Featured</h1>
          <p className="sub-description dark:text-gray-400 text-grey-500">
            Popular picks from recent student runs
          </p>

          <NavLink className="view-all view-all-featured dark:text-white text:black" to={'/products'}>
            <p>View All</p>

            <FaArrowRight/>
          </NavLink>

          {/* Convert these cards into a component with functions that can easily have information filled out for it */}
            
            {featured.map((x)=>{
              count++
              return <Featured key={x._id} _id={x._id} name={x.name} category={x.category} buzzwordOne={x.slug} buzzwordTwo={x.slug} order={count} id={x.id} {...x}/>
            })}
         
          
          {/*  */}

        </div>

        <div className="testimonial">
          <Grid />
          <p className="sub-header test">What people are saying</p>
          <p className="sub-description dark:text-gray-400 text-gray-500">
            Popular picks from recent student runs
          </p>

          <NavLink className="view-all dark:text-black" to={'/testimonials'}>
            <p>See All</p>
            <FaArrowRight />
          </NavLink>

          <div className="testimonials">
            {items.splice(Math.floor(Math.random() * (items.length-2)),3).map((testimonial) => (
                <div key={testimonial._id} className="approved-testimonials-home">
                    <p><strong>{testimonial.name}</strong></p>
                    <p>Rating: {'⭐'.repeat(testimonial.rating)}</p>
                    <p>{testimonial.message}</p>
                </div>
            ))}
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
