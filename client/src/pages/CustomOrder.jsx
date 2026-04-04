import '../styles/css/CustomOrder.css'
import {useState} from 'react'
import Navbar from "../components/Navbar";

const Order = () => { 
    const [formData, setFormData] = useState({
        name: '', // This ensures that each input has a default value
        email: '',
        phone: '',
        address: '',
        description: '',
        color: 'red',
        material: 'Nylon',
        size: '',
        file: null
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

            if(!formData.file){ // If no file is selected,
                alert("Please upload a file") // Alerts the user
                return // Stops the submission
            }

            const fd = new FormData() // Creates a new FormData object
            fd.append('file', formData.file) // Appends the file to the FormData

            const fileRes = await fetch('http://localhost:5000/api/public/custom-orders/file', {method:'POST', body: fd})
            // The above line sends the file to the server

            const fileJson = await fileRes.json() // Parses the response as JSON
            if(!fileRes.ok) throw new Error(fileJson.message || "File upload failed") // If the response is bad, throw error

            const fileId = fileJson?.file?.id // Gets the file ID from the response

            if(!fileId) throw new Error("Upload succeded, but no file ID returned") // Error message for missing file ID
            
            const orderPayload = { // This is the payload for the order, which includes all form data and the file ID
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                description: formData.description,
                color: formData.color,
                material: formData.material,
                size: formData.size,
                fileId
            }

            const orderRes = await fetch('http://localhost:5000/api/public/custom-orders', { // This sends the order data to the server
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(orderPayload)
            })

            const orderJson = await orderRes.json() // Parses the order response as JSON
            if(!orderRes.ok) throw new Error(orderJson.message || "Order submission failed") // If the response is bad, throw error

            alert("Order submitted successfully!") // Success message

            setFormData({ // Resets the form
                name: '',
                email: '',
                phone: '',
                address: '',
                description: '',
                color: 'red',
                material: 'Nylon',
                size: '',
                file: null
            })
        }catch(err){
            console.error(err) // Logs the error for debugging
            alert(err.message || "Something went wrong") // Alerts the user of the error
        }finally{
            setLoading(false) // Stops loading no matter what
        }
    }

    return (
        <div id="container" className='container bg-gradient-to-br from-blue-200 to-white dark:from-blue-400 dark:via-black dark:to-black dark:text-white text-black'>
            <Navbar/>
            <form className ='form dark:bg-gray-800 bg-white mt-6' onSubmit={handleSubmit}>
                <h1 id="header">Custom Order</h1>
                <label htmlFor="name">Name:</label>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} disabled={loading} required/>
                <label htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} disabled={loading} required/>
                <label htmlFor="number">Phone Number: XXX-XXX-XXXX</label>
                    <input type="tel" name="phone" placeholder="XXX-XXX-XXXX" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={formData.phone} onChange={handleChange} disabled={loading} required/>
                <label htmlFor="address">Address:</label>
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} disabled={loading} required/>
                <label htmlFor="description">Product Description:</label>
                    <textarea name="description" placeholder="Product Description" value={formData.description} onChange={handleChange} disabled={loading} required/>
                
                <label htmlFor="color">Select Color:</label>
                <select name="color"  value={formData.color} onChange={handleChange}>
                    <option value="red" className='text-black'>Red</option>
                    <option value="blue" className='text-black'>Blue</option>
                    <option value="green" className='text-black'>Green</option>
                    <option value="purple" className='text-black'>Purple</option>
                    <option value="yellow" className='text-black'>Yellow</option>
                    <option value="orange" className='text-black'>Orange</option>
                </select>

                <label htmlFor="material">Select Material:</label>
                <select name="material" value={formData.material} onChange={handleChange} disabled={loading}>
                    <option value="Nylon">Nylon</option>
                    <option value="PLA">PLA</option>
                    <option value="ABS">ABS</option>
                </select>

                <label htmlFor="size">Size:</label>
                    <input type="text" name="size" placeholder="Length, Width, Height (in CM)" value={formData.size} onChange={handleChange} disabled={loading} required/>

                <label htmlFor="file">3D Model File:</label>
                    <input type="file" name="file" onChange={handleFileChange} accept=".stl, .zip" disabled={loading} required/>
                    
                <button type="submit" disabled={loading}>
                    {loading ? "Submitting Order..." : "Submit"} {/* This changes the button text when loading */ }
                </button>
            </form>
        </div>
    )
}

export default Order