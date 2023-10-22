import "@/styles/globals.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import type { AppProps } from "next/app";
import Layout from "./Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </LocalizationProvider>
  );
}
