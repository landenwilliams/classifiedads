import { createRoot } from 'react-dom/client';
import App from './components/app.js';
import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

const appElement = document.getElementById("root");
const root = createRoot(appElement);

root.render(
    <HashRouter>
        <App />
    </HashRouter>
)
