import Navbar from "./Navbar"
import Section from "./Section"

const Main = (data) => {
  return (
    <div>
        <Navbar />
        <Section data={{subHeader : "Hai :3", text: "lorem ipsum dolor sit, consecitor amet"}} />
        <Section data={{subHeader : "Hai :3", text: "lorem ipsum dolor sit, consecitor amet", image : "./logo512.png"} } />
    </div>
  )
}

export default Main