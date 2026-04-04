import React from 'react'
import Grid from '../components/grid'
import '../styles/css/adminDashboard.css'

const Admin = () => {
  return (
    <div className='admin'>
      <Grid/>
      <div className="admin-head">
        <h1>Admin Dashboard</h1>
      </div>
    </div>
  )
}

export default Admin


  