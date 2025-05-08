import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className='bg-black text-white min-h-screen py-2 px-2'>
        <h1 className='text-3xl font-bold mb-4'>Bienvenido a Spotify Clone</h1>

        <App />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
