import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Menu from './Menu'
import '../css/businessPage.css'

import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const data =
{

    id:0,
    businessName:"Kroger",
    missionStatement:"think not what kroger can do for your country think what your country can do for kroger",
    about:"we make yogurt and stuff",
    rating:[true,true,false,false,true,],
    address:"432 barack obm",
    businessOwner:"",
    contacts:[{
        id:0,
        type:"message",
        contactInfo:"602-929-28"
    },{
        id:1,
        type:"email",
        contactInfo:"null my email is null"
    }],
    img:{logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Kroger_logo_%281961-2019%29.svg/250px-Kroger_logo_%281961-2019%29.svg.png",
    img2:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTEzzLgbrApSLMl1oWE3-WJDEEXCAUhep286rX8V5Cal3ZIjLhiDl74OMD4OrhKEZtUhKO&s",
    img3:"https://i0.wp.com/platypus.asn.au/wp-content/uploads/2021/07/DSCN0780.jpg?resize=748%2C561&ssl=1"},
    menu:'menu'
    

}

// data 
const BusinessPage = () => {

    
      // return (
      //   <div>Business</div>
      // )
    
  return (
    
    <div  id={data.id}>

        {/* <Navbar /> */}

        {/* <Map /> */}

        <section>
            
            <div>
            
                <h1>{data.businessName}</h1>
                <h3>{data.missionStatement}</h3>  
                <p>{data.about}</p>  
            
            </div>

            <img src={data.logo} alt="" />

        </section>

        <section>
            <div>
                
                <p>Ratings: </p>
                {data.rating.sort().reverse().map((val) => {
                    return <span>{val ? <FaStar/> : <CiStar />}</span>
                })}
            </div>

            <img src={data.img2} alt="" />
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

            <img src={data.img3} alt="" />
        </section>

        {/* <Menu data={data.menu}/> */}

        

    </div>
  )
}

export default BusinessPage