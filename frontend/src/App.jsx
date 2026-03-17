import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Menu,Footer,Popups, Category, News, Recent, Entertainment, Sports, LifeStyle} from './components'
import { Route, Routes } from 'react-router-dom'
function App() {
  return (
    <>
     <Popups/>
      <header class="header">
        <div class="container">
          <div class="logo">
            <img src="src/assets/logo.png" width={247} height={62} />
          </div>
          <div class="ad-banner">
            <img src="src/assets/images/banner.png" width={771} height={97} />
            <span className='banner-text'>Best Selling BLOG and MAGAZINE Theme of All Time</span>
            <span className='banner-text2'>Experience the change!</span>
          </div>
        </div>
      </header>
     <Menu/>
     <Routes>
      {/* The Category is just a template for route handling.
       Add actual jsx component inside each element according to their route names */}
      <Route path='/' element={[<News/>,<Category/>,<Entertainment/>,<Sports/>,<LifeStyle/>]} />
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
