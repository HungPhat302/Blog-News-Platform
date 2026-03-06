import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Menu,Footer,Popups, Category, News} from './components'
import { Route, Routes } from 'react-router-dom'
function App() {
  return (
    <>
     <Popups/>
     <div className='container'>
        <div className='logo-container'>
          <img src="src/assets/logo.png" width={247} height={62}></img>
        </div>
        <div className='banner'>
          <img src='src/assets/images/banner.png' width={771} height={97}></img>
          <div className='banner-button'>
            <a href='' className='banner-button-text'>Purchase Now</a>
          </div>
          <span className='banner-text'>Best Selling BLOG and MAGAZINE
          Theme of All Time</span>
          <span className='banner-text-2'>Experience the Change</span>
        </div>
      </div>
     <Menu/>
     <News/>
     <Routes>
      {/* The Category is just a template for route handling.
       Add actual jsx component inside each element according to their route names */}
      <Route path='' />
      <Route path='/international' element={<Category/>}/>
      <Route path='/sports' element={<Category/>}/>
      <Route path='/opinion' element={<Category/>}/>
      <Route path='/business' element={<Category/>}/>
      <Route path='/youth' element={<Category/>}/>
      <Route path='/entertainment' element={<Category/>}/>
      <Route path='/lifestyles' element={<Category/>}/>
     </Routes>
     <Footer/>
     {/* This component handles routing to display new pages logic inside components folder */}
    </>
  )
}

export default App
