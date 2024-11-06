import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Loading from './components/loading/Loading';
const LazyApp = React.lazy(() => import('./App'))

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Suspense fallback={<Loading />}>
    <LazyApp />
  </React.Suspense>
);
