import {useState} from 'react'
import { Link } from 'react-router-dom'

// {homeClick, formClick, Main.mapClick,Main.businessClick}
function Navbar() {
    const screenWidth = window.innerWidth
    const [hamburger, setHamburger] = useState(false)
    const navData = {
        header : "Super Cool Business",
        links: [
            {id: "0", name : "Home", link : "/"},
            {id: "1", name : "Form", link : "/form"},
            {id: "2", name : "Map", link : "/map"},
            {id: "3", name : "Business-Page", link : "/business-spotlight"},
        ]
    }


    function hamburgerBar(){
        if(hamburger){
            return(
                <div className='buttonContainerMobile'>
                    <Link to="/map">Map</Link>
                    <Link to="/form">Form</Link>
                    <Link to="/business-spotlight">Business-Page</Link>
                    <Link to="/">Home</Link>
                </div>
            )
        }else{
            return(<></>)
        }
    }



    if(screenWidth > 768){
  return (
    <nav>
        <h1>{navData.header}</h1>
        <button onClick={() => document.body.classList.toggle('darkMode')}>Toggle Dark Mode</button>
        <div className='buttonContainer'>
            {navData.links.map((linkObject) => {
                return <a href={linkObject.link} id={linkObject.id}>{linkObject.name}</a>
            })}

        </div>
    </nav>
  )
        } else {
        return (
            <nav>
                <h1>{navData.header}</h1>
                <button onClick={() => document.body.classList.toggle('darkMode')}>Toggle Dark Mode</button>
                <button aria-label='Toggle Navigation Menu' className="btn" onClick={() => setHamburger(!hamburger)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></button>
                <div>
                    {hamburgerBar()}
                </div>
            </nav>
        )
        }
}

export default Navbar