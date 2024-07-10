import React from 'react';
import './App.css';
import { Login,Project } from './components';
import {Dashboard,AddEmployee,Layout} from './pages';
import {Routes,Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/addEmployee' element={<AddEmployee/>}/>
        <Route path='/hr' element={<Layout/>}>
            <Route path='project' element={<Project/>}/>
        </Route>
        <Route path='/*' element={<div>Coming Soon</div>}/>
      </Routes>
    </div>
  );
}

export default App;
