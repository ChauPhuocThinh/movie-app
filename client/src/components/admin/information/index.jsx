import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './information.scss'
export default function Information(props) {
  const [date, setDate] = useState('')
  const moment = require('moment');

  useEffect(()=>{
    setDate(moment(props.user.createdAt).format("DD/MM/YYYY hh:mm"))
  },[props, moment])

  if(props.auth){
    return (
      <>
      <div className="has-text-center">
        <h1 className="title is-3">{props.user.fullName}</h1>
        <p>Ngày gia nhập: <b>{date}</b></p>
        <p>Email: <b>{props.user.email}</b></p>
        <p>Số điện thoại: <b>{props.user.phoneNumber}</b></p>
        <p>Quyền tài khoản: <b>{props.user.role}</b></p>
      </div>
      </>
    )
  }else if(!props.auth){
    return(
      <h3 className='h3-gold'>Bạn cần đăng nhập trước khi truy cập trang này. Nhấp <Link to='/admin/login'>vào đây</Link> để đăng nhập.</h3>
    )
  }
}
