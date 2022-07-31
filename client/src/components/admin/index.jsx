import React,{useEffect, useState} from 'react'
import './admin.scss'
import {Link, Route, Routes, useLocation} from 'react-router-dom'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Home from './home'
import Films from './films'
import CreateFilm from './films/create'
import Users from './users'
import Information from './information'
import History from './history'
import Viewers from './viewers'
import UpdateFilm from './films/update'
import UpdateUser from './users/update'
import UpdateViewer from './viewers/update'
import UpdateActor from './actors/update'
import Login from './login'
import NavbarAuth from './navbarAuth.jsx'
import Signup from './users/signup'
import Actors from './actors'
import CreateActor from './actors/create'
export default function Admin() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const axios = require('axios')
  const [user, setUser] = useState('')
  const [auth, setAuth] = useState(false)
  const [data, setData] = useState([])
  let location = useLocation()
  useEffect(()=>{
    const navbar = document.querySelector('#header')
    window.onscroll = () => {
      if (window.scrollY > 81) {
          navbar.classList.add('nav-active')
      }else if(window.scrollY < 80){
          navbar.classList.remove('nav-active')
      }
    };
  })
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  useEffect(()=>{
    const token = getCookie('token_admin')
    axios.defaults.headers.common['cookie-auth-admin'] = token || ''
    axios.get(`${process.env.REACT_APP_API_URL}/admin/`,{withCredentials: true})
      .then(res => {
        if (res.data === 'error'){
          setAuth(false)
        }else{
          setAuth(true)
          setUser(res.data.user)
        }
      })
      .catch((err)=>console.log(err))
  },[axios])
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/admin/views-chart`)
        .then((res)=> setData(res.data))
        .catch((err)=> console.log(err))
  },[axios])
  const toggleMenuMobile = ()=>{
    const heightNavbar = document.getElementById('header').clientHeight
    const menuMobile = document.getElementById('menu-mobile')
    if (heightNavbar > 55){
      menuMobile.style.display = 'none'
    }else{
      menuMobile.style.display = 'unset'
    }
  }
  useEffect(()=>{
    const menuMobile = document.getElementById('menu-mobile')
    if(menuMobile !== null){
      menuMobile.style.display = 'none'
    }
  },[location.pathname])
  return (
    <>
        <div id='header' >
        <ul id='nav'>
          <li style={{width:'115px'}}>
            <Link to='#' id='toggle-menu-mobile' onClick={toggleMenuMobile}><i className="material-icons md-light">reorder</i></Link>
            <Link to='/admin' id='logo-a'><img src='/img/logo/logo-full.png' alt='Logo' id='logo'/></Link>
          </li>
          {auth && 
            <>
            <div id="menu-mobile">
              <li className='li'>
                <Link to='/admin/films'>Phim</Link>
              </li>
              <li className='li'>
                <Link to='/admin/users'>Tài khoản</Link>
              </li>
              <li  className='li'>
                <Link to='/admin/actors'>Diễn viên</Link>
              </li>
              <li  className='li'>
                <Link to='/admin/viewers'>Người xem</Link>
              </li>
              <NavbarAuth auth={auth} user={user} />
            </div>
          </>}
          
        </ul>
      </div>
      <div id='body'>
        <div id='container'>
          <ThemeProvider theme={darkTheme}>
            <Routes>
              <Route path='/admin' element={auth === true ? <Home data={data}/>:<h3 className='h3-gold'>Đây là khu vực chỉ dành cho Ban quản trị. <Link to='/admin/login'>Nhấp vào đây</Link> để đăng nhập.</h3>}/>
              <Route path='/admin/login' element={<Login auth={auth}/>}/>
              <Route path='/admin/users/signup' element={auth === true ? <Signup />:<h3 className='h3-gold'>Đây là khu vực chỉ dành cho Ban quản trị. <Link to='/admin/login'>Nhấp vào đây</Link> để đăng nhập.</h3>}/>
              <Route path='/admin/films' element={auth === true ? <Films />:<h3 className='h3-gold'>Đây là khu vực chỉ dành cho Ban quản trị. <Link to='/admin/login'>Nhấp vào đây</Link> để đăng nhập.</h3>}/>
              <Route path='/admin/actors' element={auth === true ? <Actors />:<h3 className='h3-gold'>Đây là khu vực chỉ dành cho Ban quản trị. <Link to='/admin/login'>Nhấp vào đây</Link> để đăng nhập.</h3>}/>
              <Route path='/admin/actors/create' element={auth === true ? <CreateActor />:<h3 className='h3-gold'>Đây là khu vực chỉ dành cho Ban quản trị. <Link to='/admin/login'>Nhấp vào đây</Link> để đăng nhập.</h3>}/>
              <Route path='/admin/users' element={auth === true ? <Users />:<h3 className='h3-gold'>Đây là khu vực chỉ dành cho Ban quản trị. <Link to='/admin/login'>Nhấp vào đây</Link> để đăng nhập.</h3>}/>
              <Route path='/admin/viewers' element={auth === true ? <Viewers />:<h3 className='h3-gold'>Đây là khu vực chỉ dành cho Ban quản trị. <Link to='/admin/login'>Nhấp vào đây</Link> để đăng nhập.</h3>}/>
              <Route path='/admin/films/create' element={auth === true ? <CreateFilm />:<h3 className='h3-gold'>Đây là khu vực chỉ dành cho Ban quản trị. <Link to='/admin/login'>Nhấp vào đây</Link> để đăng nhập.</h3>}/>
              <Route path='/admin/information' element={auth === true ? <Information auth={auth} user={user} />:<h3 className='h3-gold'>Đây là khu vực chỉ dành cho Ban quản trị. <Link to='/admin/login'>Nhấp vào đây</Link> để đăng nhập.</h3>}/>
              <Route path='/admin/history' element={auth === true ? <History />:<h3 className='h3-gold'>Đây là khu vực chỉ dành cho Ban quản trị. <Link to='/admin/login'>Nhấp vào đây</Link> để đăng nhập.</h3>}/>
              <Route path='/admin/films/:id' element={auth === true ? <UpdateFilm />:<h3 className='h3-gold'>Đây là khu vực chỉ dành cho Ban quản trị. <Link to='/admin/login'>Nhấp vào đây</Link> để đăng nhập.</h3>}/>
              <Route path='/admin/actors/:id' element={auth === true ? <UpdateActor />:<h3 className='h3-gold'>Đây là khu vực chỉ dành cho Ban quản trị. <Link to='/admin/login'>Nhấp vào đây</Link> để đăng nhập.</h3>}/>
              <Route path='/admin/users/:id' element={auth === true ? <UpdateUser />:<h3 className='h3-gold'>Đây là khu vực chỉ dành cho Ban quản trị. <Link to='/admin/login'>Nhấp vào đây</Link> để đăng nhập.</h3>}/>
              <Route path='/admin/viewers/:id' element={auth === true ? <UpdateViewer />:<h3 className='h3-gold'>Đây là khu vực chỉ dành cho Ban quản trị. <Link to='/admin/login'>Nhấp vào đây</Link> để đăng nhập.</h3>}/>
            </Routes>
          </ThemeProvider>
        </div>
      </div>
    </>
    
  )
}
