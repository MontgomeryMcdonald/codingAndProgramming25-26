import {NavLink} from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar(){

    const linkClass = ({ isActive }) => "link" + (isActive ? " active" : "");

    return (
    <div className="nav dark:bg-[#00394B]">
         <div className="nav-info">
            
            <div className="blurb">
                <h3 className='nav-head text-black dark:text-white ml-12 text-2xl'>ParaLocal</h3>
            <sub className='nav-sub ml-12'>West-mec</sub>
            </div>
            
        </div>   

        <div className="nav-interaction dark:text-white text-black pr-3">
            <NavLink className='nav-products' to={'/'}>Home</NavLink>
            <NavLink className='nav-products' to={'/sign-up'}>Sign-in</NavLink>
            <NavLink className='nav-products' to={'/products'}>Buisnesses</NavLink>
            <NavLink className='nav-products' to={'/testimonials'}>Testimonials</NavLink>
            <NavLink className="nav-custom" to={'/custom-order'}>Add a Business</NavLink>
        </div>
    </div>
        
    )
}
