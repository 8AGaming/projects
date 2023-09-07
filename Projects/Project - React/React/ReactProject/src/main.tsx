import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import PageProvider from "./components/PageContext.tsx";
import TripsProvider from "./components/TripsContext.tsx";
import TripProvider from "./components/TripContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PageProvider>
      <TripsProvider>
        <TripProvider>
          <App />
        </TripProvider>
      </TripsProvider>
    </PageProvider>
  </React.StrictMode>
);
