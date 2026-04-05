import {useState, useEffect} from 'react'
import {NavLink} from "react-router-dom";
import SingleProduct from '../components/SingleProduct'
import Navbar from "../components/Navbar"
import { CiSearch } from "react-icons/ci";

const Products = () => {

    const [business, setBusiness] = useState([])
    
    async function fetchBusinesses() { // async to give it time to catch up

        const result = await fetch('http://localhost:5000/api/public/business/')// grabing the data from the data base
        var revised = await result.json()
        setBusiness(revised.data)// secure the data as a const

    }
    
    useEffect(() => {
        fetchBusinesses() // call the function at start up
    }, [])
    
    const [filter, setFilter] = useState([])
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {

        setSearch(e.target.value)

    }
    
    const handleFilter = (e) => {

        setFilter(e.target.value)

    }

    console.log(business)
    return(
        <div className='product layout bg-gradient-to-br from-[#00A2D3] to-white dark:from-[#00A2D3] dark:to-black min-h-screen dark:text-[#00A9DC] text-black'> 
        <Navbar/>

            <form onSubmit={e => e.preventDefault()} className=' bg-[background-color: rgba(0, 0, 0, 0)] rounded-sm p-3'>
                <div className="product searchbar border-none rounded-2xl p-3 m-2 mb-3 shadow-lg text-center dark:bg-[#00394B] bg-white">
                    <input placeholder='search' value={search} onChange={handleSearch} className='search dark:bg-[#00A2D3] dark:text-[#00394B] ' />

                <select name="sort" onChange={handleFilter} className='filter dark:bg-[#00A2D3] dark:text-black' >
                    <option value="">None</option>
                    <option value="Food">Food</option>
                    <option value="Art-Supply">Art Supply</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Services">Services</option>
                    <option value="Trades">Trades</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                </select>
                </div>
                                                
                {/* send inportant info into the list */}
                <div className='product-column bg-[background-color: rgba(0, 0, 0, 0)] min-h-screen max-w-170 p-2 '>
                     
                     {/* use regex to filter throug all the products based on the users requests */}
                        {business.filter((product)=> product.name.match(new RegExp(search, 'i')) !== null && product.category.match(new RegExp(filter, 'i')) !== null).map((product)=>{
                                
                                return ( <SingleProduct
                                            
                                        key={product._id} 
                                        product = {product}

                                />)

                        })}
                        
                </div>

            </form>
                
        </div>
    )
}

export default Products