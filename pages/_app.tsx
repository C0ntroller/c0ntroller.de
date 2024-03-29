import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import "../styles/globals.scss";
import { CommandsProvider } from "../lib/commands/ContextProvider";
import { ModalFunctionProvider } from "../components/Terminal/contexts/ModalFunctions";

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="description" content="This is the homepage of C0ntroller." />
      <meta name="keyword" content="private, homepage, software, portfolio, development, cli, hacker, terminal, javascript, js, typescript, ts, nextjs, react, responsive" />
      <meta name="author" content="C0ntroller" />
      <meta name="copyright" content="C0ntroller" />
      <meta name="robots" content="index,nofollow" />

      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#444444" />
      <meta name="msapplication-TileImage" content="/mstile-310x310.png" />
      <meta name="theme-color" content="#444444" />
    </Head>
    <ThemeProvider>
      <CommandsProvider>
        <ModalFunctionProvider>
          <Component {...pageProps} />
        </ModalFunctionProvider>
      </CommandsProvider>
    </ThemeProvider>
  </>;
}

export default MyApp;
