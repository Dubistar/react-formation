import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {router} from './App.jsx'
import { ThemeContextProvider } from './hooks/useTheme.jsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      {/* The ThemeContextProvider wraps the App to provide theme context */}
      <RouterProvider router={router} />
    </ThemeContextProvider>
  </StrictMode>,
)
