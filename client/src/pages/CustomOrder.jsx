import '../styles/css/CustomOrder.css'
import {useState} from 'react'
import Navbar from "../components/Navbar";

const Order = () => {
    const [formData, setFormData] = useState({
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

    const [loading, setLoading] = useState(false)

    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleFileChange = (e) =>{
        setFormData(prev => ({...prev, file: e.target.files[0]}))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(loading) return // Prevents multiple submissions

        try{
            setLoading(true);

            if(!formData.file){
                alert("Please upload a file")
                return
            }

            const fd = new FormData()
            fd.append('file', formData.file)

            const fileRes = await fetch('http://localhost:5000/api/public/custom-orders/file', {method:'POST', body: fd})

            const fileJson = await fileRes.json()
            if(!fileRes.ok) throw new Error(fileJson.message || "File upload failed")

            const fileId = fileJson?.file?.id

            if(!fileId) throw new Error("Upload succeded, but no file ID returned")
            

            const orderPayload = {
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

            const orderRes = await fetch('http://localhost:5000/api/public/custom-orders', {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(orderPayload)
            })

            const orderJson = await orderRes.json()
            if(!orderRes.ok) throw new Error(orderJson.message || "Order submission failed")

            alert("Order submitted successfully!")

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
            console.error(err)
            alert(err.message || "Something went wrong")
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
                    {loading ? "Submitting Order..." : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default Order
