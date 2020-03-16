import Head from "next/head";

import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

import "./styles.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <div className="bg-blue-100 font-mono text-sm tracking-tight">
        <Navigation />

        <div className="container mx-auto">
          <div className="mx-8 sm:mx-auto">
            <Component {...pageProps} />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
