import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './signup.scss'
const AlertMui = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Signup() {
  const axios = require('axios')
  const [alert, setAlert] = useState(false)
  const [error, setError] = useState(false)
  const handleSubmit=(e)=>{
    e.preventDefault()
    const data = {}
    data.fullName = document.getElementById('fullName').value
    data.email = document.getElementById('email').value
    data.password = document.getElementById('password').value
    axios.post(`${process.env.REACT_APP_API_URL}/signup`,data)
      .then((res)=>{
        if(res.data === 'created'){
          setAlert(true)
        }else if (res.data === 'email-duplicate'){
          setError(true)
        }
      })
      .catch((err)=> console.log(err))
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
    setError(false)
  };
  document.title = 'Đăng ký tài khoản'
  return (
    <>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <AlertMui onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Đăng ký thành công! Đường link xác nhận vừa được gửi đến email của bạn. Vui lòng kiểm tra email và nhấn 'Xác Nhận'!
        </AlertMui>
      </Snackbar>
    </Stack>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <AlertMui onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Email này đã được sử dụng!
        </AlertMui>
      </Snackbar>
    </Stack>
    <form onSubmit={handleSubmit}>
      <div className='container-signup'>
        <h1 className='title-signup'>Đăng ký</h1>
        <div className='box-signup'>
            <div className='field'>
                <div className="control">
                  <input type='text' id='fullName' placeholder='Họ tên của bạn'></input>
                </div>
            </div>
           <div className='field'>
              <div className="control">
                <input type='text' id='email' placeholder='Email'></input>
              </div>
           </div>
           <div className='field'>
              <div className="control">
                <input type='password' id='password' placeholder='Mật khẩu'></input>
              </div>
           </div>
          <button type='submit'>Đăng ký</button>
        </div>
        <p className='text-right'><Link to='/login'>Đăng nhập</Link></p>

      </div>

    </form>
    </>
  )
}
