import {useParams} from 'react-router'
import {useState, useEffect} from 'react'
import {NavLink} from "react-router-dom";
import Navbar from '../components/Navbar'

const Detail = () =>{

    // getting the id from the params
    const {id} = useParams()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() =>{

        const fetchProduct = async () => {
            try{

                // get the product based on ID -- it errors if you remove the http://localhost:5000
                const response = await fetch(`http://localhost:5000/api/public/business/${id}`)
                const data = await response.json()
                // use state the data
                setProduct(data.data)
                console.log(data.data)
                
            }catch(err){
                console.error('Error fetching product:', err)
            }finally{

                // when done change loading status
                setLoading(false)
            }
        }

        fetchProduct() // Fetch product by _id

    }, [])

    // loading screen
    if (loading) return <div>Loading...</div>

    // error message
    if (!product) return <div>business not found</div>

    return (
        <div className="product layout bg-gradient-to-br from-[#00A2D3] to-white dark:from-[#00A2D3] dark:to-black min-h-screen dark:text-[#00A9DC] text-black">
            <Navbar/>
            {/* <div className="product-image">
                <img src={product.image} alt={product.name}/>
            </div> */}
            <div className="product-info flex flex-col items-center border-1 border-black rounded-2xl p-3 m-2 mb-3 shadow-lg text-center dark:bg-gray-800 bg-white dark:text-white text-black gap-3">
                <h1>names: {product.name}</h1>
                <h3>phone: {product.phone}</h3>
                {/* <p className="price">${product.price}</p> */}
                <p className="category">Category: {product.category}</p>
                <p>address: {product.address}</p>
                <div>
                    <h3>hours</h3>
                    {product.hours}
                </div>           
                <p>{product.description}</p>    
                <p>Rating: {'⭐'.repeat(product.ratings)}</p>

                <NavLink className='nav-products' to={'/create-a-testimonials'}>
                    <button>
                        Add a testimonial
                    </button>
                </NavLink>

            </div>
        </div>
    )
}

export default Detail