import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginForm from './components/session/LoginForm';
import * as sessionActions from './store/session';
import SignupForm from './components/session/SignupForm';
import Navigation from './components/Navigation/Navigation';
import SplashPage from './components/session/SplashPage';
import PostForm from './components/posts/Postform';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SplashPage />
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/signup',
        element: <SignupForm />
      },
      {
        path: '/feed',
        element: <PostForm />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
