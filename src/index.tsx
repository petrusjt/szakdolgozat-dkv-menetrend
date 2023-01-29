import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import './i18n';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Root} from "src/components/Root";
import App from "src/App";
import {CustomError} from "src/components/errors/CustomError";
import {ScheduleLister} from "src/components/schedule/ScheduleLister";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <App />
            }, {
                path: "/lines/:lineId",
                element: <ScheduleLister />
            }
        ],
        errorElement: <CustomError />
    }, {
        path: "/error",
        element: <CustomError />
    }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
