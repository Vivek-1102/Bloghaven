import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css'
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { LandingPage } from './pages/LandingPage';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';
import { Publish } from './pages/Publish';
import { About } from './pages/About';

function App() {
   

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/blog/:id' element={<Blog/>} />
        <Route path='/blog' element={<Blogs/>} />
        <Route path='/publish' element={<Publish/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
