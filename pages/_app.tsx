import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserContextProvider } from "../context/useUserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Footer from "../components/Footer";
import Script from "next/script";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!}
    >
      <QueryClientProvider client={client}>
        <UserContextProvider>
          <>
            <Script id="analytics-script">
              {`// for links
              document.querySelectorAll("a").forEach((tag) => {
                tag.addEventListener("click", () => {
                  try {
                    fetch(
                      "${process.env.NEXT_PUBLIC_MY_ANALYTICS_SERVER}/analytics",
                      {
                        headers: [["Content-Type", "application/json"]],
                        method: "POST",
                        body: JSON.stringify({
                          type: "[link clicked]",
                          source: "blognado",
                          description: "The link -"+  tag.href +"- was clicked",
                        }),
                      }
                    );
                  } catch (err) {
                    console.log(err);
                  }
                });
              })`}
            </Script>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
          </>
          <ReactQueryDevtools />
        </UserContextProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
