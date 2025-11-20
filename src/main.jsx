import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { SavedDataProvider } from './context/SavedDataContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SavedDataProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SavedDataProvider>
    </AuthProvider> 
  </StrictMode>
)
