import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const AlertMui = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
export default function ChangePassword() {
    const axios = require('axios')
    const [alert, setAlert] = useState(false)
    const [error, setError] = useState(false)
    const handleSubmit=(e)=>{
      e.preventDefault()
      const data = {}
      data.codeConfirm = document.getElementById('codeConfirm').value
      data.newPassword = document.getElementById('new-password').value
      axios.put(`${process.env.REACT_APP_API_URL}/forgot/change-password`,data)
        .then((res)=>{
          if(res.data === 'changed-password'){
            setAlert(true)
          }else if (res.data === 'codeConfirm-invalid'){
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
    document.title = 'Đổi mật khẩu'
  return (
    <>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <AlertMui onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Đổi mật khẩu thành công! Hãy <Link to='/login'>đăng nhập</Link> ngay nào!
        </AlertMui>
      </Snackbar>
    </Stack>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <AlertMui onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Mã xác nhận không đúng!
        </AlertMui>
      </Snackbar>
    </Stack>
    <form onSubmit={handleSubmit}>
      <div className='container-forgot'>
        <h1 className='title-forgot'>Đổi mật khẩu</h1>
        <div className='box-forgot'>
           <div className='field'>
              <div className="control">
                <input type='text' id='codeConfirm' name='codeConfirm' placeholder='Mã xác nhận'></input>
              </div>
           </div>
           <div className='field'>
              <div className="control">
                <input type='password' id='new-password' name='new-password' placeholder='Mật khẩu mới'></input>
              </div>
           </div>
          <button type='submit'>Xác nhận</button>
        </div>
      </div>

    </form>
    </>
  )
}
