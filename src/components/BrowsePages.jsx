import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Menu from './Menu'
import './businessPage.css'

import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";



// data 
const BrowsePage = (data) => {

    
      // return (
      //   <div>Business</div>
      // )
    
  return (
    
    <div id={data.id}>

        {/* <Navbar /> */}

        {/* <Map /> */}

        <section>
            
            <div>
            
                <h1>{data.businessName}</h1>
                <h3>{data.missionStatement}</h3>  
                <p>{data.about}</p>  
            
            </div>

            <img src={data.img.logo} alt="" />

        </section>

        <section>
            <div>
                
                <p>Ratings: </p>
                {data.rating.sort().reverse().map((val) => {
                    return <span>{val ? <FaStar/> : <CiStar />}</span>
                })}
            </div>

            <img src={data.img.img2} alt="" />
        </section>


        <section>
            <div>
                <h3>Extra Information</h3>
                <p>Address: {data.address}</p>
                <p>Business Owner: {data.businessOwner}</p>
                <p>Contact Us:</p>
                <ul>
                    {data.contacts.map((contact) => {
                        
                        return <li id={contact.id}>{contact.type}: {contact.contactInfo}</li>

                    })}
                </ul>
            </div>

            <img src={data.img.img3} alt="" />
        </section>

        {/* <Menu data={data.menu}/> */}

        

    </div>
  )
}

export default BrowsePage