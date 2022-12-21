import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import firebaseContext from "./context/firebase";
import { FieldValue, firebase } from "../src/lib/firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <firebaseContext.Provider value={{ firebase, FieldValue }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </firebaseContext.Provider>
);
