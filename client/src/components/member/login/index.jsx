import React,{useState} from 'react'
import './login.scss'
import {Link} from 'react-router-dom'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
const AlertMui = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Login(props) {
  const axios = require('axios')
  const [error, setError] = useState(false)
  const handleSubmit=(e)=>{
    e.preventDefault()
    const data = {}
    data.email = document.getElementById('email').value
    data.password = document.getElementById('password').value
    axios.post(`${process.env.REACT_APP_API_URL}/login`,data)
      .then((res)=>{
        if(res.data.message === 'successfully'){
          setCookie('token', res.data.token, 90)
          window.location.href = `${process.env.REACT_APP_CLIENT_URL}/`

        }else if (res.data === 'invalid'){
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
  document.title = 'Đăng nhập tài khoản'
  if(!props.auth){
    return (
      <>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
          <AlertMui onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Email hoặc mật khẩu không đúng!
          </AlertMui>
        </Snackbar>
      </Stack>
      <form onSubmit={handleSubmit}>
        <div className='container-login'>
          <h1 className='title-login'>Đăng nhập</h1>
          <div className='box-login'>
             <div className='field'>
                <div className="control">
                  <input type='text' id='email' placeholder='Email'></input>
                </div>
             </div>
             <div className='field'>
                <div className="control"><input type='password' id='password' placeholder='Mật khẩu'></input></div>
             </div>
            <button type='submit'>Đăng nhập</button>
          </div>
          <p className='text-right'><Link to='/signup'>Đăng ký</Link>  ·  <Link to='/forgot'>Quên mật khẩu</Link></p>
  
        </div>
  
      </form>
      </>
    )
  }else{
    window.location.href = `${process.env.REACT_APP_CLIENT_URL}`
  }
}
