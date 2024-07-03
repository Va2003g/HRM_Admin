import React from 'react';
import './App.css';
import { Login } from './components';
import {Dashboard,AddEmployee} from './pages';
import {Routes,Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/addEmployee' element={<AddEmployee/>}/>
      </Routes>
    </div>
  );
}

export default App;
