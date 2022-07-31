import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './forgot.scss'
const AlertMui = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Forgot() {
  const axios = require('axios')
  const [alert, setAlert] = useState(false)
  const [error, setError] = useState(false)
  const handleSubmit=(e)=>{
    e.preventDefault()
    const data = {}
    data.email = document.getElementById('email').value
    axios.post(`${process.env.REACT_APP_API_URL}/forgot`,data)
      .then((res)=>{
        if(res.data === 'sended-confirm-email'){
          setAlert(true)
        }else if (res.data === 'email-unavailable'){
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
  document.title = 'Lấy lại mật khẩu'
  return (
    <>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <AlertMui onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Mã xác nhận lấy lại mật khẩu vừa được gửi đến email của bạn! Vui lòng kiểm tra hộp thư.
        </AlertMui>
      </Snackbar>
    </Stack>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <AlertMui onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Email không tồn tại! Bạn có thể tạo tài khoản mới với email này <Link to='/signup'>tại đây</Link>
        </AlertMui>
      </Snackbar>
    </Stack>
    <form onSubmit={handleSubmit}>
      <div className='container-forgot'>
        <h1 className='title-forgot'>Lấy lại mật khẩu</h1>
        <div className='box-forgot'>
           <div className='field'>
              <div className="control">
                <input type='text' id='email' name='email' placeholder='Email đã đăng ký'></input>
              </div>
           </div>
          <button type='submit'>Gửi</button>
        </div>
      </div>

    </form>
    </>
  )
}
