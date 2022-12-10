import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import MyItems from './pages/MyItems';
import Purchases from './pages/Purchases';
import Register from './pages/Register';
import { setToken } from './store/authReducer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token'))
      dispatch(setToken(localStorage.getItem('token')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Box className='App'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/my-items' element={<MyItems />} />
          <Route path='/purchases' element={<Purchases />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
