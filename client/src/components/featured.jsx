import React from 'react'
import Grid from './grid'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import {NavLink} from "react-router-dom";


const Featured = ({name, price, category, buzzwordOne, buzzwordTwo, order, id, _id}) => {
  const link = name.replaceAll(' ', '-').toLowerCase()
  var position = null
  if(!order){
    return console.log('Must have order')
  }

  if(order === 1){
     position = 'one'
  }
  else if(order === 2){
     position = 'two'
  }
  else if(order === 3){
     position = 'three'
  }
  else{
     position = 'four'
  }

  return (
<div className={`featured-product featured-product-${position} dark:bg-gray-800`}>
            <Grid />
            <p className="featured-product-name dark:text-white text-black">{name}</p>
            <p className="featured-product-price dark:text-white text-gray-500">{price}</p>
            <p className="featured-product-category dark:text-gray-400 text-gray-500">{category}</p>
            <div className="buzzword buzzword-one dark:text-black">{buzzwordOne}</div>
            <div className="in-stock buzzword-three buzzword">In stock</div>
            <NavLink className="featured-details" to={`/products/${_id}`}>
              <p className="view dark:text-black"> View Detail</p>
              <FaArrowRight style={{ fontSize: "small" }} />
            </NavLink>
          </div>  )
}


export default Featured