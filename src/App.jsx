import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import DoctorCreatePage from './features/doctor/routes/doctor-create-route';
import { QueryClientProvider } from 'react-query';
import queryClient from './lib/react-query';
import Router from './router';

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router/>
      </QueryClientProvider>
    </>
  )
};

export default App;
