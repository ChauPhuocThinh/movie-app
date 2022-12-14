import React, { useEffect, useState } from 'react'
import {Routes, Route, Link, useLocation} from 'react-router-dom'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import './member.scss'
import './responsive.scss'
import Home from './home'
import Browse from './browse'
import Login from './login'
import Movie from './movie'
import Show from './show'
import Search  from './search'
import Top from './top'
import NavbarAuth from './navbarAuth'
import Settings from './settings'
import Donate from './donate'
import Collection from './collection'
import Signup from './signup'
import ActiveEmail from './signup/active'
import Forgot from './forgot'
import ChangePassword from './forgot/changePassword'
import MovieDetail from './movie/movieDetail'
import SeriesDetail from './show/seriesDetail'
import Watch from './watch'
import Actor from './actor'
export default function Member() {
  const axios = require('axios')
  const [viewer, setViewer] = useState([])
  const [auth, setAuth] = useState(false)
  const [active, setActive] = useState()
  let location = useLocation()
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
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
    const token = getCookie('token')
    axios.defaults.headers.common['cookie-auth'] = token || ''
    axios.get(`${process.env.REACT_APP_API_URL}/authenticator`,{withCredentials: true})
      .then(res => {
        if (res.data === 'error' || res.data === null){
          setAuth(false)
        }else{
          setAuth(true)
          setViewer(res.data)
          if(res.data.activedEmail){
            setActive(true)
          }else{ setActive(false)}
        }
      })
      .catch((err)=>console.log(err))
  },[axios])
    useEffect(()=>{
      const body = document.getElementById('body')
      const container = document.getElementById('container')
      if(location.pathname.includes('/movie/') || location.pathname.includes('/series/')){
        body.classList.add('margin-0')
        container.classList.add('margin-0')
      }else{
        body.classList.remove('margin-0')
        container.classList.remove('margin-0')
      }
    },[location])
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
      document.getElementById('menu-mobile').style.display = 'none'
    },[location.pathname])
  return (
    <> 
      <div id='header' >
        <ul id='nav'>
          <li style={{width:'115px'}}>
            <Link to='#' id='toggle-menu-mobile' onClick={toggleMenuMobile}><i className="material-icons md-light">reorder</i></Link>
            <Link to='/' id='logo-a'><img src='/img/logo/logo-full.png' alt='Logo' id='logo'/></Link>
          </li>
          <div id='menu-mobile'>
            <li className='li'>
              <Link to='/search'><i className="material-icons md-light">search</i>T??m Ki???m</Link>
            </li >
            <li className='li'>
              <Link to='/top'>Phim Hot</Link>
            </li>
            <li className='li'>
              <Link to='/movie'>Phim L???</Link>
            </li>
            <li  className='li'>
              <Link to='/show'>Phim B???</Link>
            </li>
            <li  className='li'>
              <Link to='/browse'>Phim M???i</Link>
            </li>
            <NavbarAuth auth={auth} viewer={viewer}/>
          </div>
        </ul>
      </div>
      <div id='body'>
        <div id='container'>
        <ThemeProvider theme={darkTheme}>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/search' element={<Search />}/>
            <Route path='/top' element={<Top />}/>
            <Route path='/movie' element={<Movie />}/>
            <Route path='/movie/:id' element={<MovieDetail viewer={viewer}/>}/>
            <Route path='/show' element={<Show />}/>
            <Route path='/series/:id' element={<SeriesDetail viewer={viewer}/>}/>
            <Route path='/browse' element={<Browse />}/>
            <Route path='/actor/:name' element={<Actor />}/>
            <Route path='/watch/:id' element={<Watch viewer={viewer}/>}/>
            <Route path='/login' element={<Login auth={auth}/>}/>
            <Route path='/settings' element={<Settings active={active} auth={auth} viewer={viewer}/>}/>
            <Route path='/donate' element={<Donate active={active} auth={auth}/>}/>
            <Route path='/collection' element={<Collection active={active} auth={auth} viewer={viewer}/>}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/signup/active' element={<ActiveEmail />}/>
            <Route path='/forgot' element={<Forgot />}/>
            <Route path='/forgot/change-password' element={<ChangePassword />}/>
          </Routes>
          </ThemeProvider>
        </div>
      </div>
      <div id='footer'>
        <div className="container-footer">
          <h3 className="title-footer">Phim ch???t l?????ng cao online c???a XemPhim kh??c g?? so v???i c??c trang phim kh??c?</h3>
          <ul className='content-footer'>
            <li>L?? phim bluray (reencoded), c?? ????? ph??n gi???i th???p nh???t l?? Full HD (1080p), trong khi h???u h???t c??c trang phim kh??c ch??? c?? t???i ????? ph??n gi???i HD (720p) l?? cao nh???t</li>
            <li>Ch???t l?????ng cao, l?????ng d??? li???u tr??n gi??y (bitrate) g???p t??? 5 - 10 l???n phim online th??ng th?????ng - ????y l?? y???u t??? quy???t ?????nh ????? n??t c???a phim (th???m ch?? c??n quan tr???ng h??n ????? ph??n gi???i)</li>
            <li>??m thanh 5.1 (6 channel) thay v?? stereo (2 channel) nh?? c??c trang phim kh??c (k??? c??? Youtube)</li>
            <li>Ph?? h???p ????? xem tr??n m??n h??nh TV, m??y t??nh, laptop c?? ????? ph??n gi???i cao</li>
            <li>N???u kh??ng h??i l??ng v???i ph??? ????? c?? s???n, b???n c?? th??? t??? upload ph??? ????? c???a ri??ng m??nh ????? xem online</li>
            <li>C?? l???a ch???n hi???n ph??? ????? song ng??? (t???c hi???n ?????ng th???i c??? ti???ng Anh v?? ti???ng Vi???t), ph?? h???p v???i nh???ng ng?????i mu???n h???c ti???ng Anh qua ph??? ????? phim</li>
          </ul>
          <div className="contact">
            <Link to='#'>Li??n h???</Link>
            <a href='https://www.facebook.com/chauphuocthinh57/' className='layout-fb'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z"></path></svg>Xemphim</a>
          </div>
        </div>
      </div>
    </>
  )
}
