import './App.css';
import { QueryClientProvider } from 'react-query';
import queryClient from './lib/react-query';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        
        <Outlet />
      </QueryClientProvider>
    </>
  )
}

export default App;
