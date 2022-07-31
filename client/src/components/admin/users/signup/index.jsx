import React, {useState} from 'react'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const AlertMui = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Signup() {
  const axios = require('axios')
  const [error, setError] = useState(false)
  const handleSubmit=(e)=>{
    e.preventDefault()
    const data = {}
    data.fullName = document.getElementById('fullName').value
    data.email = document.getElementById('email').value
    data.password = document.getElementById('password').value
    data.phoneNumber = document.getElementById('phoneNumber').value
    axios.post(`${process.env.REACT_APP_API_URL}/admin/signup`,data)
      .then((res)=>{
        if(res.data === 'created'){
          window.location.href = `${process.env.REACT_APP_CLIENT_URL}/admin/users`
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
    setError(false)
  };
  return (
    <>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <AlertMui onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Email này đã được sử dụng!
        </AlertMui>
      </Snackbar>
    </Stack>
    <form onSubmit={handleSubmit}>
      <div className='container-signup'>
        <h1 className='title-signup'>Thêm Người Quản Lý</h1>
        <div className='box-signup'>
            <div className='field'>
                <div className="control">
                  <input type='text' id='fullName' placeholder='Họ tên'></input>
                </div>
            </div>
           <div className='field'>
              <div className="control">
                <input type='text' id='email' placeholder='Email'></input>
              </div>
           </div>
           <div className='field'>
              <div className="control">
                <input type='text' id='phoneNumber' placeholder='Số điện thoại'></input>
              </div>
           </div>
           <div className='field'>
              <div className="control">
                <input type='password' id='password' placeholder='Mật khẩu'></input>
              </div>
           </div>
          <button type='submit'>Đăng ký</button>
        </div>

      </div>

    </form>
    </>
  )
}
