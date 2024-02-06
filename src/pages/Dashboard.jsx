import React from 'react'
import Balance from '../components/Balance'
import Navbar from '../components/Navbar'
import Users from '../components/Users'

const Dashboard = () => {
  return (
    <div>
      {/* NAvbar */}
      <Navbar/>

      {/* Balance */}
      <Balance/>

      {/* user */}
      <Users/>

    </div>
  )
}

export default Dashboard