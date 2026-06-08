// main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import RootLayout from './app/layout/RootLayout';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container as HTMLElement);
  // eslint-disable-next-line react/jsx-filename-extension
  root.render(<RootLayout />);
} else {
  console.error('Failed to find the root element.');
}
