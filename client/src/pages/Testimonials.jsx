import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    async function stuff(params) {
        const result = await fetch('http://localhost:5000/api/public/testimonials')
        var revised = await result.json()
        setItems(revised)
        console.log(items) 
    }
    useEffect( () => {
        stuff()
    }, [])

    // const fetchTestimonials = async () => {
    //     try{
    //         const response = await fetch('/api/testimonials')
    //         const data = await response.json()
    //         setTestimonials(data)
    //         setLoading(false)
    //     }catch (err){
    //         console.error('Error fetching testimonials:', err)
    //         setLoading(false)
    //     }
    // }

    

    return (
        <>
        
        <div className='product layout bg-gradient-to-br from-blue-200 to-white dark:from-blue-400 dark:via-black dark:to-black dark:text-white text-black'>
            <Navbar/>
            <h2>Testimonials</h2>
            {items.map((testimonial) => (
                <div key={testimonial._id} className='testimonials-all dark:bg-gray-800 bg-white'>
                    <p><strong>{testimonial.name}</strong></p>
                    <p>Rating: {'⭐'.repeat(testimonial.rating)}</p>
                    <p>{testimonial.message}</p>
                </div>
            ))}
        </div>
        </>
        
    )
}

export default Testimonials