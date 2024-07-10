import NavBar from './components/NavBar'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Register from './Pages/Register'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {
  return (
    <main>
    <NavBar/>

   <div className ="bg-[#1b2838] h-screen">
    <BrowserRouter>
    <Routes>
      
    <Route index element={<Home/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/Home" element={<Home/>}/>
    <Route path="/Register" element={<Register/>}/>
    
    
    </Routes>
    </BrowserRouter>
    </div>
    </main>
  );
}     

export default App;
