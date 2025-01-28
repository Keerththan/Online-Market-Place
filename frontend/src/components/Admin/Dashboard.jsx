import React from 'react'
import { Navbar } from './Navbar'
import Dash from './Dash'


export const Dashboard = ({sidebarToggle,setSidebarToggle}) => {
  return (
    <div className={`${sidebarToggle? "ml-25":""} w-full d-flex flex-column align-items-center`}>
        <Navbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
        className='d-flex'/>
         
    </div>
  )
}
