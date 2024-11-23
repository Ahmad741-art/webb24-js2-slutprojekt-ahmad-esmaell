// This code makes sure to dispay/arrange the app to the website
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);