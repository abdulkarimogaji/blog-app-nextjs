import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/NavBar'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { UserContextProvider } from '../context/useUserContext';


const client = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <UserContextProvider>
        <NavBar />
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </UserContextProvider >
    </QueryClientProvider>
  )
}

export default MyApp
