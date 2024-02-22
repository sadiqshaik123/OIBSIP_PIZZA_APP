import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route, Link, Switch, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import Cartscreen from './screens/Cartscreen';
import Registerscreen from './screens/Registerscreen'
import Loginscreen from './screens/Loginscreen';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.bundle';
import Ordersscreen from './screens/Ordersscreen';
import Adminscreen from './screens/Adminscreen';


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Routes>
        <Route path="/cart" element={<Cartscreen/>} exact />
        <Route path="/" element={<HomeScreen/>} exact />
        <Route path="/register" element={<Registerscreen/>} exact />
        <Route path="/login" element={<Loginscreen/>} exact />
        <Route path="/orders" element={<Ordersscreen/>} exact />
        <Route path="/admin" element={<Adminscreen/>} />
        

      </Routes>
        
    </Router>
      
      
    </div>
  );
}


export default App;
