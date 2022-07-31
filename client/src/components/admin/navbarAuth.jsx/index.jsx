import React from 'react'
import {Link} from 'react-router-dom'
function deleteCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
export default function NavbarAuth(props) {
  var authenticated = props.auth
  const logout = ()=>{
    deleteCookie('token_admin')
    window.location.href = `${process.env.REACT_APP_CLIENT_URL}/admin/login`
  }
  if(authenticated){
    return (
      <li className='nav-right li'>
        <Link to='#'>{props.user.fullName}<i className="material-icons blue428bca">expand_more</i></Link>
        <ul className='subnav'>
        <li style={{marginTop: "8px"}}><Link to='/admin/information'><i className="material-icons margin-right-12">person_outline</i>Tài Khoản</Link></li>
        <li><Link to='/admin/history'><i className="material-icons margin-right-12">monetization_on</i>Lịch sử</Link></li>
        <li style={{marginBottom: "8px"}} onClick={logout}><Link to='#'><i className="material-icons margin-right-12">logout</i>Thoát</Link></li>
        </ul>
    </li>
    )
  }else{
    return (<></>)
  }
}
