import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './fonts/Apercu.ttf';
import './fonts/Apercu-Bold.ttf';
import './fonts/Apercu-BoldItalic.ttf';
import './fonts/Apercu-Italic.ttf';
import './fonts/Apercu-Light.ttf';
import './fonts/Apercu-LightItalic.ttf';
import './fonts/Apercu-Medium.ttf';
import './fonts/Apercu-MediumItalic.ttf';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
