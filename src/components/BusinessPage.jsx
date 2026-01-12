import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Menu from './Menu'
import './businessPage.css'
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
    img:{img1:"",img2:"",img3:""},
    menu:'menu'
    

}

// data 
const BusinessPage = () => {

    
      // return (
      //   <div>Business</div>
      // )
    
  return (
    
    <div id={data.id}>

        {/* <Navbar /> */}

        {/* <Map /> */}

        <div>
            <h1>{data.businessName}</h1>
            <h3>{data.missionStatement}</h3>
        </div>
        <p>{data.about}</p>
        <p>Ratings: </p>
        {data.rating.sort().reverse().map((val) => {
            return <span>{val ? "star" : "nostar"}</span>
        })}


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

        {/* <Menu data={data.menu}/> */}

        

    </div>
  )
}

export default BusinessPage