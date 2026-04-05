import {NavLink} from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar(){

    const linkClass = ({ isActive }) => "link" + (isActive ? " active" : "");

    return (
    <div className="nav dark:bg-gray-800">
         <div className="nav-info">
            <div className="placeholder-logo"><img src="../img/Local.png" alt="" /></div>
            <div className="blurb">
                <h3 className='nav-head text-black dark:text-white'>ParaLocal</h3>
            <sub className='nav-sub'>West-mec</sub>
            </div>
            
        </div>   

        <div className="nav-interaction dark:text-white text-black">
            <NavLink className='nav-products' to={'/'}>Home</NavLink>
            <NavLink className='nav-products' to={'/sign-up'}>sign-in</NavLink>
            <NavLink className='nav-products' to={'/products'}>business</NavLink>
            <NavLink className='nav-products' to={'/testimonials'}>Testimonials</NavLink>
            <NavLink className="nav-custom" to={'/custom-order'}>add a business</NavLink>
        </div>
    </div>
        
    )
}
