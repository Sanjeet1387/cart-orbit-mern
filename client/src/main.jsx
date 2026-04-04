//note: richColors enables the red/green/yellow backgrounds. this only for styling purpose, nahi toh sirf <Toaster /> hi hota
import { Toaster } from "@/components/ui/sonner"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux";
import store from './store/store';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
     <App />
     <Toaster richColors /> 
    </Provider>
  </BrowserRouter>
);
