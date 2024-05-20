import ReactDOM from 'react-dom/client'
import './index.css'
import router from './router/index.jsx'
import { RouterProvider } from 'react-router-dom'

// CSS
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
