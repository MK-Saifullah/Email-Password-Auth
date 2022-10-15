import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './layout/Main';
import Login from './components/Login/Login';
import About from './components/About/About';
import SignUp from './components/SignUp/SignUp';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <SignUp></SignUp>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/about',
          element: <About></About>
        },
      ]
    }
  ])
  return (
    <div className="">
      <RouterProvider router = {router}></RouterProvider>
    </div>
  );
}

export default App;
