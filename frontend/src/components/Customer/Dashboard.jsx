import React from 'react'
import { Navbar } from './Navbar'
import ProuductList from './ProuductList'
import CustomerProfile from './CustomerProfile'

export const Dashboard = ({ user, sidebarToggle, setSidebarToggle, search, setSearch,searchQuery, setSearchQuery }) => {
  return (
    <div className={`${sidebarToggle ? "ml-25 z-n1" : ""} w-full d-flex flex-column align-items-center`}>
      <Navbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
        search={search}
        setSearch={setSearch}
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {/* <ProuductList/> */}
      {/* <CustomerProfile/> */}
    </div>
  )
}
