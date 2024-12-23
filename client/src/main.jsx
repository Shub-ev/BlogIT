import React from 'react'
import ReactDOM from 'react-dom/client'
import { ContextProvider } from './context/mongoContext.jsx';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ContextProvider>
)
