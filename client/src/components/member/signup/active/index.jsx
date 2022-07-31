import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
export default function ActiveEmail() {
    const [valid, setValid] = useState(false)
    const axios = require('axios')
    const code = window.location.href.replace(`${process.env.REACT_APP_CLIENT_URL}/signup/active?code=`,'')
    useEffect(()=>{
        document.title = 'Kích hoạt tài khoản'
        axios.put(`${process.env.REACT_APP_API_URL}/signup/active?code=${code}`)
            .then((res)=>{
                if (res.data === 'actived'){
                    setValid(true)
                }else if(res.data === 'invalid'){
                    setValid(false)
                }
            })
            .catch((err)=>console.log(err))
    },[axios, code])
  if(valid){
      return(
        <p className='title-h1'>Tài khoản của bạn đã được kích hoạt thành công. Hãy <Link to='/login'>Đăng nhập</Link> ngay nào!!!</p>
      )
  }else{
      return(
        <p className='title-h1'>Mã kích hoạt không tồn tại. Hãy <Link to='/signup'>Đăng ký</Link> để lấy mã kích hoạt!!!</p>
      )
  }
}
