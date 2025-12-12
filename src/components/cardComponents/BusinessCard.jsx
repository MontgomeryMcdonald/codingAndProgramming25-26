const BusinessCard = (data) => {
  return (
    <div id={data.data.id}>
        <h2>{data.data.businessName}</h2>
        <h3>{data.data.missionStatement}</h3>
        <p>{data.data.about}</p>2
        <p>Ratings: </p>
        {data.data.rating.map((val) => {
            return <span>{val ? "star" : "nostar"}</span>
        })}
        <a href={data.data.id}>See More</a>
    </div>
  )
}

export default BusinessCard 