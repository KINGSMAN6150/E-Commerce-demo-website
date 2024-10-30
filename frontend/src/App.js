import Navbar from './Components/Navbar/Navbar';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Buy from './Pages/Buy';
import Reminder from './Pages/Reminder';
import Pricing from './Pages/Pricing';
import Aboutus from './Pages/Aboutus';
import Loginsignup from './Pages/Loginsignup';
import Sell from './Pages/Sell';
import Product from './Pages/Product';
import Login from './Pages/Login';
import LoginSuccess from './Pages/LoginSuccess';



function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/home' element={<Home />}/>
          <Route path='/buy' element={<Buy />}/>
          <Route path='/product' element={<Product />}>
          <Route path=':productId' element={<Product />}/>
          </Route>
          <Route path='/sell' element={<Sell />}/>
          <Route path='/reminder' element={<Reminder />}/>
          <Route path='/pricing' element={<Pricing />}/>
          <Route path='/Aboutus' element={<Aboutus />}/>
          <Route path='/signup' element={<Loginsignup />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/loginsuccess' element={<LoginSuccess />}/>

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
