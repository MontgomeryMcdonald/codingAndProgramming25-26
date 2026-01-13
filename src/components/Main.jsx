import BusinessPage from "./BusinessPage"
import Navbar from "./Navbar"
import Section from "./Section"
import Map from "./Map"
import Form from "./Form"
import Home from "./Home"
import Footer from "./Footer"
import {useState, useEffect} from 'react'
import './main.css'


const Main = ({data, content}) => {

  const [home, setHome] = useState(false)
  const [form, setForm] = useState(false)
  const [map, setMap] = useState(false)
  const [business, setBusiness] = useState(true)
  

  const homeClick = () => {
    setForm(Boolean(false))
    setMap(Boolean(false))
    setBusiness(Boolean(false))
    setHome(Boolean(false))

    setHome(Boolean(true))
    
  }

  const formClick = () => {
    setForm(Boolean(false))
    setMap(Boolean(false))
    setBusiness(Boolean(false))
    setHome(Boolean(false))

    setForm(Boolean(true))
  }

  const mapClick = () => {
    setForm(Boolean(false))
    setMap(Boolean(false))
    setBusiness(Boolean(false))
    setHome(Boolean(false))

    setMap(Boolean(true))
  }

  const businessClick = () => {
    setForm(Boolean(false))
    setMap(Boolean(false))
    setBusiness(Boolean(false))
    setHome(Boolean(false))
    
    setBusiness(Boolean(true))
    // console.log(business)
  }

  
  return (
    <main>

        <div className='buttonContainerMobile'>
        
          <button key={0} onClick={()=>{homeClick()}} >home</button >
          <button key={1} onClick={()=>{formClick()}} >form</button >
          <button key={2} onClick={()=>{mapClick()}} >map</button >
          <button key={3} onClick={()=>{businessClick()}} >business</button >
        
        </div>

        {/* <Section data={{subHeader : "Hai :3", text: "lorem ipsum dolor sit, consecitor amet"}} />
        <Section data={{subHeader : "Hai :3", text: "lorem ipsum dolor sit, consecitor amet", image : "./logo512.png"} } /> */}

      <div className="display">
                                                
        {home?<Home/>:form?<Form/>:business?<BusinessPage data={data} />:map?<Map/>:null}

      </div>


      <Footer />

    </main>
  )
}

export default Main