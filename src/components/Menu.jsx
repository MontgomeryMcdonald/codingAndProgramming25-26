import React from 'react'

const Menu = (data) => {
  return (
    <table>
    {data.data.map((row) => { 
        return <tr>
            {row.map((cell) => {
                return <td>{cell}</td>
            })}
        </tr>
    })}
    </table>
  )
}

export default Menu