import React from 'react'

const Section = (data) => {
    
    if(data.data.image == null){

        return (
            <div>1
                <h3>{data.data.subHeader}</h3>
                <p>{data.data.text}</p>
        </div>
        )
    }else{
        return (
            <div>
                <h3>{data.data.subHeader}</h3>
                <p>{data.data.text}</p>
                <img src={data.data.image} alt={data.data.alttext} />
            </div>
        )
    }
}

export default Section