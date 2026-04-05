import '../styles/css/CustomOrder.css'
import {useState} from 'react'
import Navbar from "../components/Navbar";

// 
// when making a busines the open hours need to be json.stringify
// 
// 

// const  BusinessSchema = new mongoose.Schema({

        // customer info (name/email/phone/message)

        // name:{type:String, required:true, trim:true, maxlength:100},
        // phone:{type:String, required:true, trim:true, maxlength:20},
        // message:{type:String, required:true, trim:true, maxlength:200},
        // //Change this to a user object
        // hours:{type:String, required:true},
        // description:{type: String, required: true, trim: true}
// },{timestamps:true})// timestamps


const Create = () => { 
    const [formData, setFormData] = useState({
        name:'',
        rating:1,
        message:""
    })

    const [loading, setLoading] = useState(false) // Loading state, used to disable form and show loading text

    const handleChange = (e) =>{
        const {name, value} = e.target // Gets the name and value of the target
        setFormData(prev => ({...prev, [name]: value})) // Updates the field
    }

    const handleFileChange = (e) =>{
        setFormData(prev => ({...prev, file: e.target.files[0]})) // Updates the file field
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(loading) return // Prevents multiple submissions

        try{
            
            setLoading(true); // Starts loading

            const orderPayload = { // This is the payload for the order, which includes all form data and the file ID
                name: formData.name,
                rating: formData.rating,
                message: formData.message,
            }

            const orderRes = await fetch('http://192.168.1.168:5000/api/public/testimonial', { // This sends the order data to the server
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(orderPayload)
            })

            const orderJson = await orderRes.json() // Parses the order response as JSON
            if(!orderRes.ok) throw new Error(orderJson.message || "Order submission failed") // If the response is bad, throw error

            alert("Order submitted successfully!") // Success message

            setFormData({ // Resets the form
                name:'',
                rating:1,
                message:""
            })
        }catch(err){
            console.error(err) // Logs the error for debugging
            alert(err.message || "Something went wrong") // Alerts the user of the error
        }finally{
            setLoading(false) // Stops loading no matter what
        }
    }

        

    return (
        <div id="container" className='bg-gradient-to-br from-blue-200 to-white dark:from-blue-400 dark:via-black dark:to-black dark:text-white text-black'>
            <Navbar/>
            <form className ='form dark:bg-gray-800 bg-white mt-6' onSubmit={handleSubmit}>
                <h1 id="header">Add A Small Business</h1>
                <label htmlFor="name">Business Name:</label>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} disabled={loading} required/>
                <label htmlFor="rating">rating</label>
                    <input type="number" name="rating" min-value="1" max-value="5" placeholder="1" value={formData.rating} onChange={handleChange} disabled={loading} required/>
                <label htmlFor="message">message:</label>
                    <input type="text" name="message" placeholder="message" value={formData.message} onChange={handleChange} disabled={loading} required/>
                
                
                    
                <button type="submit" disabled={loading}>
                    {loading ? "Submitting Order..." : "Submit"} {/* This changes the button text when loading */ }
                </button>
            </form>
        </div>
    )
}

export default Create