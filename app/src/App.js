import React from 'react';
import Home from './Components/Home'
import InspectionCreate from './Components/InspectionCreate'
import Inspection from './Components/Inspection'

import { BrowserRouter, Route, Link } from 'react-router-dom'

import './App.css';
import 'antd/dist/antd.css';
import { PageHeader } from 'antd';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
            backgroundColor: '#13c2c2',
            marginBottom: '50px'
          }}
          title={<Link style={{color:'#000000'}} to='/'>Inspections</Link>}
        />
        <Route exact path='/' component={Home} />
        <Route path='/newInspection' component={InspectionCreate} />
        <Route path='/inspection/:_id' component={Inspection} />
      </div>
    </BrowserRouter>
  );
}

export default App;
