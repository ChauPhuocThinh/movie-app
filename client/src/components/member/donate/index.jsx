import React from 'react'
import {Link} from 'react-router-dom'
import './donate.scss'
export default function Donate(props) {
  document.title = 'Donate cho chúng tôi'
  if(props.active && props.auth){
    return (
      <div><p>Tính năng này đang được phát triển...</p></div>
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