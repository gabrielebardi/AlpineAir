import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { Layout } from './components/Layout';
import { SearchPage } from './pages/Search';
import { LoginPage } from './pages/auth/Login';
import { RegisterPage } from './pages/auth/Register';
import { BookingPage } from './pages/booking/Booking';
import { BookingsPage } from './pages/booking/Bookings';
import { RequireAuth } from './components/auth/RequireAuth';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/booking/:flightId',
        element: (
          <RequireAuth>
            <BookingPage />
          </RequireAuth>
        ),
      },
      {
        path: '/bookings',
        element: (
          <RequireAuth>
            <BookingsPage />
          </RequireAuth>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes); 