import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './settings.scss'
export default function Settings(props) {
  const [date, setDate] = useState('')
  const moment = require('moment');

  useEffect(()=>{
    document.title = 'Thông tin tài khoản'
    setDate(moment(props.viewer.createdAt).format("DD/MM/YYYY hh:mm"))
  },[props, moment])

  if(props.active && props.auth){
    return (
      <>
      <div className="has-text-center">
        <h1 className="title is-3">{props.viewer.fullName}</h1>
        <p>Ngày gia nhập: <b>{date}</b></p>
        <p>Email: <b>{props.viewer.email}</b></p>
        <p>Số dư: <b style={{'color': '#f14668'}}>Tính năng nạp tiền đang được phát triển...</b></p>
      </div>
      </>
    )
  }else if(!props.auth){
    return(
      <h3 className='h3-gold'>Bạn cần đăng nhập trước khi truy cập trang này. Nhấp <Link to='/login'>vào đây</Link> để đăng nhập.</h3>
    )
  }else if(!props.active){
    return(
      <h3 className='h3-gold'>Tài khoản này chưa được kích hoạt. Vui lòng kiểm tra  hộp thư email đăng ký của bạn!</h3>
    )
  }
}
