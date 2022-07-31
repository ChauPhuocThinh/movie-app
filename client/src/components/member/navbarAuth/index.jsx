import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './navbarAuth.scss'
function deleteCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
export default function NavbarAuth(props) {
    var authenticated = props.auth
    const navigate = useNavigate();
    const logout = ()=>{
        deleteCookie('token')
        window.location.href = `${process.env.REACT_APP_CLIENT_URL}/login`
    }
    if (authenticated){
        return (
            <li className='nav-right li'>
                <Link to='#'>{props.viewer !== null  && props.viewer.fullName}<i className="material-icons blue428bca">expand_more</i></Link>
                <ul className='subnav'>
                    <li style={{marginTop: "8px"}}><Link to='/settings'><i className="material-icons margin-right-12">person_outline</i>Tài Khoản</Link></li>
                    <li><Link to='/donate'><i className="material-icons margin-right-12">monetization_on</i>Donate</Link></li>
                    <li><Link to='/collection'><i className="material-icons margin-right-12">theaters</i>Bộ Sưu Tập</Link></li>
                    <li style={{marginBottom: "8px"}} onClick={logout}><Link to='#'><i className="material-icons margin-right-12">logout</i>Thoát</Link></li>
                </ul>
            </li>
            
        )
    }else{
        
        return (
            <li className='nav-right'><button className='button-31' onClick={() => navigate('/login')}>Đăng nhập</button></li>
          )
        }
    
}