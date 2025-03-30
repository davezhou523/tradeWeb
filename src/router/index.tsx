import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import CustomerAcquisition from '../pages/CustomerAcquisition';
import CustomerManagement from '../pages/CustomerManagement';
import EmailMarketing from '../pages/EmailMarketing';
import EmailTemplates from '../pages/EmailTemplates';
import SystemSettings from '../pages/SystemSettings';
import { AuthProvider } from '../contexts/AuthContext';

const AppWithAuth = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppWithAuth />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/customer-acquisition',
        element: <CustomerAcquisition />,
      },
      {
        path: '/customer-management',
        element: <CustomerManagement />,
      },
      {
        path: '/email-marketing',
        element: <EmailMarketing />,
      },
      {
        path: '/email-templates',
        element: <EmailTemplates />,
      },
      {
        path: '/settings',
        element: <SystemSettings />,
      },
    ],
  },
]);

export default router;