import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Menu,Footer,Popups, Category, News, Entertainment, Sports, LifeStyle, Ad, Video, Logo} from './components'
function App() {
  return (
    <>
     <Popups/>
      <Logo/>
     <Menu/>
      <News/>
      <Category/>
      <Entertainment/>
      <Sports/>
      <LifeStyle/>
      <Ad/>
      <Video/>
     <Footer/>
     {/* This component handles routing to display new pages logic inside components folder */}
    </>
  )
}

export default App
