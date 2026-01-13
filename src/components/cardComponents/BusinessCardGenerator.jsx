import BusinessCard from "./BusinessCard"

const BusinessCardGenerator = ({data}) => {
  return (
    <div>
        {data.map((business) => {
            return <BusinessCard data={business}/>
        })}
    </div>
  )
}

export default BusinessCardGenerator