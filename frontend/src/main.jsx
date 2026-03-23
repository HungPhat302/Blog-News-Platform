import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Admin, Article, Author, Category, Footer, LoginForm, Logo, Menu, News, Popups,Post,RegisterForm } from './components/index.js'

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
        <Route path='/author' element={[<Popups/>,<Logo/>,<Menu/>,<Author/>,<Footer/>]}/>
        <Route path='/author/prepare_post' element={[<Popups/>,<Logo/>,<Menu/>,<Post/>,<Footer/>]}/>
        <Route path='/author/edit_post/:id' element={[<Popups/>,<Logo/>,<Menu/>,<Post/>,<Footer/>]}/>
        <Route path='/admin' element={[<Popups/>,<Logo/>,<Menu/>,<Admin/>,<Footer/>]}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
