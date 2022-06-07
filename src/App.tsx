import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import { Profile } from './components/Profile/Profile';
import { Footer } from './components/Footer/Footer';
import { useDispatch } from 'react-redux';
import { DispatchThunkType } from './redux/store';
import { useSelector } from 'react-redux';
import { Preloader } from './components/common/Preloader/Preloader';
import { selectorGetInitialized } from './redux/app-selectors';
import { setUserInitialized } from './redux/app-reducer';

function App() {

  const isInitialized = useSelector(selectorGetInitialized)
  const dispatch: DispatchThunkType = useDispatch()
  const authCallback = () => {
    dispatch(setUserInitialized())
  }
  //console.log(isInitialized);

  useEffect(() => {
    authCallback()
  }, [])


  if (!isInitialized) {
    return <Preloader />
  }

  return (
    <div className='appWrapper'>
      <Header />
      <Navbar />
      <div className='content'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={<Navigate to='/profile' />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
