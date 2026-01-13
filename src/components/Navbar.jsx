import {useState} from 'react'
import Main from './Main'

// {homeClick, formClick, Main.mapClick,Main.businessClick}
function Navbar() {
    const screenWidth = window.innerWidth
    const [hamburger, setHamburger] = useState(false)
    const navData = {
        header : "Super Cool Business",
        links: [
            {id: "0", name : "Home", link : "/", function: Main.homeClick()},
            {id: "1", name : "Form", link : "/form", function: Main.formClick()},
            {id: "2", name : "Map", link : "/map", function: Main.mapClick()},
            {id: "3", name : "Business-Page", link : "/business-spotlight", function: Main.businessClick()},
        ]
    }


    function hamburgerBar(){
        if(hamburger){
            return(
                <div className='buttonContainerMobile'>
                    <a key={0} href='/' onClick={()=>{Main.homeClick()}} >home</a>
                    <a key={1} href='/form' onClick={()=>{Main.formClick()}} >form</a>
                    <a key={2} href='/map' onClick={()=>{Main.mapClick()}} >map</a>
                    <a key={3} href='/Business-spotlight' onClick={()=>{Main.businessClick()}} >business-page</a>
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