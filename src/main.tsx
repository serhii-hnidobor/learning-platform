import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'components/app/app';
import './index.css';
import { SkeletonWrapper } from 'components/common/common';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <SkeletonWrapper>
        <App />
      </SkeletonWrapper>
    </BrowserRouter>
  </React.StrictMode>,
);
