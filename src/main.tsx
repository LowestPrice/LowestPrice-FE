import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router';
import router from './Router.tsx';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position='top-center'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          icon={false}
          closeButton={false}
          style={{ width: '17.3125rem', height: '3.375rem' }}
          theme='dark'
        />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  </>
);
