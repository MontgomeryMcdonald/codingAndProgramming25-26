import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Menu from './Menu'
import data from './data'

const BusinessPage = (data) => {

  return (
    
    <div id={data.data.id}>

        <Navbar />

        {/* <Map /> */}

        <h1>{data.data.businessName}</h1>
        <h3>{data.data.missionStatement}</h3>
        <p>{data.data.about}</p>2
        <p>Ratings: </p>
        {data.data.rating.map((val) => {
            return <span>{val ? "star" : "nostar"}</span>
        })}


        <div>
            <h3>Extra Information</h3>
            <p>Address: {data.data.address}</p>
            <p>Business Owner: {data.data.businessOwner}</p>
            <p>Contact Us:</p>
            <ul>
                {data.data.contacts.map((contact) => {
                    
                    return <li id={contact.id}>{contact.type}: {contact.contactInfo}</li>

                })}
            </ul>
        </div>

        <Menu data={data.data.menu}/>

        <Footer />

    </div>
  )
}

export default BusinessPage