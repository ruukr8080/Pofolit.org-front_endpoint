"use client";

import ".././styles/globals.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/store/store";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-darkreader-mode="dynamic"
      data-darkreader-scheme="dark"
      data-darkreader-proxy-injected="true"
      data-darkreader-inline-stroke="ok"
      style={
        {
          ["--darkreader-inline-stroke"]: "currentColor",
        } as React.CSSProperties
      }
    >
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
