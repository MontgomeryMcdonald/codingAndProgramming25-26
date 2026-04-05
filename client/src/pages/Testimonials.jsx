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

    

    return (
        <>
        
        <div className='product h-screen layout bg-gradient-to-br from-[#00A2D3] to-white dark:from-[#00A2D3] dark:to-black min-h-screen dark:text-[#00A9DC] text-black'>
            <Navbar/>
            <h2 className='dark:text-[#00A9DC]'>Testimonials</h2>
            <div className="testimonial-container">
            {items.map((testimonial) => (
                <div key={testimonial._id} className='testimonials-all dark:bg-gray-800 bg-white'>
                    <p><strong>{testimonial.name}</strong></p>
                    <p>Rating: {'⭐'.repeat(testimonial.rating)}</p>
                    <p>{testimonial.message}</p>
                </div>
            ))}
            </div>
        </div>
        </>
        
    )
}

export default Testimonials