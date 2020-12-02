import React, { ReactElement } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/modal.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />;
}

export default MyApp;
