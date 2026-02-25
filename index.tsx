
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import MedSpaPage from './MedSpaPage';
import AboutPage from './AboutPage';
import MedSpaAboutPage from './MedSpaAboutPage';
import ConfirmationPage from './ConfirmationPage';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/medspa" element={<MedSpaPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/medspa/about" element={<MedSpaAboutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
