import {useState} from 'react'
import Navbar from "../components/Navbar";

const SignUp = () =>{

    const [form, setForm] = useState({ // This is the state for the form, which includes all the fields needed for signup
        name: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: ""
    })

    const [loading, setLoading] = useState(false) // Loading state, used for disabling the form and showing loading text
    const [error, setError] = useState("") // Error state, used to show error messages
    const [success, setSuccess] = useState("") // Success state, used to show success messages

    const handleChange = (e) =>{
        setForm((prev) => ({...prev, [e.target.name]: e.target.value})); // This updates the form state when an input changes. It uses the name of the input to update the correct field in the form state.
    };

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setError("") // Resets error and success messages on new submission
        setSuccess("")

        if(!form.name || !form.email || !form.address || !form.password){ // If any of the required fields are missing,
            setError("Please fill in all required fields") // Show an error message
            return // Stop the submission
        }

        if(form.password.length < 8){ // If the password is too short,
            setError("Password must be at least 8 characters") // Show an error message
            return // Stop the submission
        }

        if(form.password !== form.confirmPassword){ // If the passwords do not match,
            setError("Passwords do not match") // Show an error message
            return // Stop the submission
        }

        try{
            setLoading(true) // Starts loading

            const res = await fetch("http://localhost:5000/api/auth/register", { // This sends the signup data to the server
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.toLowerCase().trim(),
                    address: form.address.toLowerCase().trim(),
                    password: form.password
                })
            })

            const data = await res.json() // Parses the response as JSON

            if(!res.ok) throw new Error(data?.message || "Signup failed") // If the response is bad, throw error

            setSuccess("Signup successful! You can now log in.") // Success message
            setForm({name: "", email: "", address: "", password: "", confirmPassword: ""}) // Resets the form
        }catch(err){
            console.error(err) // Logs the error for debugging
            alert(err.message || "Something went wrong") // Alerts the user of the error
        }finally{
            setLoading(false) // Stops loading no matter what
        }
    }

    return (
        <div id="container" className="container">
            <Navbar/>
            <form className='form' onSubmit={handleSubmit}>
                <h1 id="header">Login</h1>
                <label htmlFor="name">Name:</label>
                    <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} disabled={loading} required/>
                <label htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} disabled={loading} required/>
                <label htmlFor="address">Address:</label>
                    <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} disabled={loading} required/>
                <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} disabled={loading} required/>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} disabled={loading} required/>

                <button type="submit" disabled={loading}>
                    {loading ? "Signing Up...": "Sign Up"}
                </button>

                {error && <p className="error">{error}</p>} {/* This shows the error message if there is one */}
                {success && <p className="success">{success}</p>} {/* This shows the success message if there is one */}
            </form>
        </div>
    )
}

export default SignUp