import { BrowserRouter,Route,Router, Routes } from 'react-router-dom';

import './App.css'
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blogpage } from './pages/Blogpage';

function App() {
   

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={Signup} />
        <Route path='/signin' element={Signin} />
        <Route path='/blog:id' element={Blogpage} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
