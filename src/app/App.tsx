import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { DashboardPage } from './pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/2020-06' />}></Route>
      <Route path='/:date' element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
