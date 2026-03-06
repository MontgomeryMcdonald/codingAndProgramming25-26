import SingleProduct from './SingleProduct'

const List = ({products, filters, search}) => 
{

        
        return(

                <div className='product-column bg-[background-color: rgba(0, 0, 0, 0)] min-h-screen max-w-170 p-2 '>
                     
                        {products.filter((product)=> product.name.match(new RegExp(search, 'i')) !== null && product.category.match(new RegExp(filters, 'i')) !== null).map((product)=>{
                                
                                return ( <SingleProduct
                                            
                                        key={product._id} 
                                        product = {product}

                                />)

                        })}
                        
                </div>

        )

}

export default List