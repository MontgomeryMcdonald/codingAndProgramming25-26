import {useParams} from 'react-router'
import {useState, useEffect} from 'react'
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
                const response = await fetch(`http://localhost:5000/api/public/products/${id}`)
                const data = await response.json()
                // use state the data
                setProduct(data)
                
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
    if (!product) return <div>Product not found</div>

    return (
        <div className="product layout bg-gradient-to-br from-blue-200 to-white dark:from-blue-400 dark:via-black dark:to-black dark:text-white text-black h-screen">
            <Navbar/>
            <div className="product-image">
                <img src={product.image} alt={product.name}/>
            </div>
            <div className="product-info flex flex-col items-center border-1 border-black rounded-2xl p-3 m-2 mb-3 shadow-lg text-center dark:bg-gray-800 bg-white dark:text-white text-black gap-3">
                <h1>{product.name}</h1>
                <p className="price">${product.price}</p>
                <p className="category">Category: {product.category}</p>
                <div className="tags">
                    {product.tags ?.map(tag => <span key={tag}>{tag}</span>)}
                </div>
                <div className="stock-status">
                    {/* change html based on supply of the product */}
                    {product.inStock ? <span className="">In Stock</span> : <span className="">Out of Stock</span>}
                </div>
            </div>
        </div>
    )
}

export default Detail