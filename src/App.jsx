/**
 * React Router DOM Imports
 * 
 * Routes --> these are containers that hold a 11 of the route definition.
 * Route --> Map to a url path to react component.
 * Navigate --> Used for redirects for routes/resources user do not have access to
 * 
 */

import { Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Map from './pages/Map.jsx'

export default function App() {
    return (
        <>
        <Navbar />
        <main>
            <div className="app">
                {/* Import a navbar and place it here */}
                <Routes>
                    <Route path='/' element={<Map />} />
                    {/* The above path to have app other route requests not listed here bring us to a 404 page */}
                </Routes>
            </div>
        </main>
        </>
    )
}