import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ToastContainer} from "react-toastify";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ToastContainer/>
        <App/>
    </React.StrictMode>
);
reportWebVitals();
