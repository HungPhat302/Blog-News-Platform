import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Article, Category, Footer, LoginForm, Logo, Menu, News, Popups,RegisterForm } from './components/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/article/:id" element={[<Popups/>,<Logo/>,<Menu/>,<Article />,<Footer/>]}></Route>
        <Route path='/sports' element={[<Popups/>,<Logo/>,<Menu/>,<News/>,<Category />,<Footer/>]} />
        <Route path='/opinion' element={[<Popups/>,<Logo/>,<Menu/>,<News/>,<Category />,<Footer/>]} />
        <Route path='/business' element={[<Popups/>,<Logo/>,<Menu/>,<News/>,<Category />,<Footer/>]} />
        <Route path='/youth' element={[<Popups/>,<Logo/>,<Menu/>,<News/>,<Category />,<Footer/>]} />
        <Route path='/entertainment' element={[<Popups/>,<Logo/>,<Menu/>,<News/>,<Category />,<Footer/>]} />
        <Route path='/lifestyles' element={[<Popups/>,<Logo/>,<Menu/>,<News/>,<Category />,<Footer/>]} />
        <Route path='/international' element={[<Popups/>,<Logo/>,<Menu/>,<News/>,<Category />,<Footer/>]}/>
        <Route path='/register' element={[<Popups/>,<Logo/>,<Menu/>,<RegisterForm/>,<Footer/>]}/>
        <Route path='/login' element={[<Popups/>,<Logo/>,<Menu/>,<LoginForm/>,<Footer/>]}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
