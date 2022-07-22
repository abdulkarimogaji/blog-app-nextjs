import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserContextProvider } from "../context/useUserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!}
    >
      <QueryClientProvider client={client}>
        <UserContextProvider>
          <NavBar />
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </UserContextProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
