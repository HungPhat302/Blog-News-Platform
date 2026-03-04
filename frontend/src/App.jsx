import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Menu,Footer,Popups} from './components'
function App() {
  return (
    <>
     <Popups/>
     <div className='logo-container'>
        <img src="src/assets/logo.png" width={247} height={62}></img>
     </div>
     <Menu/>
     <Footer/>
    </>
  )
}

export default App
