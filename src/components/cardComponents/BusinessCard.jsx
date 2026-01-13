import React from 'react'
import '../../css/businessPage.css'
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";


const BusinessCard = ({data}) => {

  return (
    <div className='card' id={data.id}>
        <section>
          <div>
            <h2>{data.businessName}</h2>
            <h3>{data.missionStatement}</h3>
            <h4>{data.address}</h4>
          </div>

          <img className="logo" src={data.logo} alt="" />
          {/* <p>{data.about}</p> */}
        </section>

        <section>

          <div>
                          
            <p>Ratings: </p>

            {data.rating.sort().reverse().map((val) => {
              return <span>{val ? <FaStar/> : <CiStar />}</span>
            })}

          </div>
          
          <a href={data.id}>See More</a>

        </section>
    </div>
  )
}

export default BusinessCard 