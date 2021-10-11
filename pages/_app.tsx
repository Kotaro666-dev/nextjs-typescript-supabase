import "../styles/globals.css";
import type { AppProps } from "next/app";

import Layout from "../components/Layout/Layout";
import store from "../store/store";
import { Provider } from "react-redux";
import MyHead from "../components/head/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MyHead>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </MyHead>
  );
}
export default MyApp;
