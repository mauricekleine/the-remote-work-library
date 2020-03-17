import { AppProps } from "next/app";
import Head from "next/head";
import "lazysizes";

import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

import "./styles.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
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
};

export default MyApp;
