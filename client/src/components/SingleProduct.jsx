import {NavLink} from "react-router-dom";


// _id, name, slug, description, price, category, inStock, featured
const SingleProduct = ({product}) =>
{
       
        return(

                <NavLink  key={product._id} className="product flex flex-col items-center border-3 rounded-2xl p-3 m-2 mb-3 shadow-lg text-center dark:bg-gray-800 bg-white" id={product.slug} to={`/products/${product._id}`} >
                        <h1 className="SP-name font-bold dark: text-white">{product.name}</h1> 
                        <div className="flex flex-col md:flex-row mt-3 mb-3 gap-6">
                                <h2 className="SP SP-price rounded-lg p-1 pr-2 pl-2 bg-blue-600 text-white font-bold">{product.price}</h2> 
                                {
                                        !product.inStock 
                                        ? <h3 className="SP SP-stock rounded-lg p-1 pr-2 pl-2 bg-blue-600 text-white font-bold">Out of Stock</h3>
                                        : <></>
                                }
                                <h4 className="SP SP-category rounded-lg p-1 pr-2 pl-2 bg-slate-200 dark:bg-slate-600 font-bold dark:text-white text-black">{product.category}</h4>
                        </div>
                        {
                                product.description.length >= 175 
                                ? <h4 className="dark:text-white text-black">{product.description.slice(0,175).trim()}...</h4>
                                : <h4 className="dark:text-white text-black">{product.description}</h4>
                        }

                </NavLink>

        )

}

export default SingleProduct