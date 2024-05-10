import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import DoctorCreatePage from './pages/doctor/DoctorCreatePage';
import { QueryClientProvider } from 'react-query';
import queryClient from './lib/react-query';
import { Route, Routes } from 'react-router-dom';
import DoctorListPage from './pages/doctor/DoctorListPage';
import DoctorSpecialLifePage from './pages/doctor/DoctorSpecialLifePage';

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<DoctorCreatePage />} />
          <Route path='/doctor-list' element={<DoctorListPage />} />
          <Route path='/doctor-list/special-life' element={<DoctorSpecialLifePage />} />
        </Routes>
      </QueryClientProvider>
    </>
  )
};

export default App;
