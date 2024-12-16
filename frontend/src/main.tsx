import React from "react";
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import '../styles/index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <></>,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <></>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      <RouterProvider router={router} />
    </>
  </React.StrictMode>,
)