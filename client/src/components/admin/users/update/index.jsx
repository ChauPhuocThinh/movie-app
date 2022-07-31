import React,{useEffect, useState} from 'react'
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const AlertMui = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};
export default function UpdateUser() {
  const location = useLocation()
  const Id = location.pathname.replace('/admin/users/','')
  const axios = require('axios')
  const [field, setField] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseDelete = () => setOpen(false);
  const { register, handleSubmit} = useForm();
  const handleDelete = () => {
    setLoading(true)
    axios.delete(`${process.env.REACT_APP_API_URL}/admin/users/${Id}/delete`)
      .then(res => {
        setLoading(false)
        window.location.href = `${process.env.REACT_APP_CLIENT_URL}/admin/users`
      })
      .catch(err => {
        setLoading(false)
        setError(true)
      })
  }
  const onSubmit = (data) => {
    setLoading(true)
    axios.put(`${process.env.REACT_APP_API_URL}/admin/users/${Id}/update`,data)
      .then(res => {
          setLoading(false)
          setAlert(true)
      })
      .catch(err => {
        setLoading(false)
        setError(true)})
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
    setError(false)
  };
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/admin/users/${Id}`)
      .then(res => setField(res.data))
      .catch(err => console.error(err))
  },[axios,Id])
  return (
    <>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <AlertMui onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Cập nhật thành công!
        </AlertMui>
      </Snackbar>
    </Stack>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <AlertMui onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Có lỗi xảy ra! Vui lòng thử lại!
        </AlertMui>
      </Snackbar>
    </Stack>
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '32ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h3 className='h3-gold float-left'>Chỉnh sửa thông tin tài khoản</h3>
      <div></div>
        <TextField disabled id="fullName" name='fullName' value={field.fullName || ''} label="Họ tên" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="email" name='email' value={field.email || ''} label="Email" type="text" multiline InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="role" name='role' value={field.role || ''} label="Quyền hạn" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="createdAt" name='createdAt' value={field.createdAt || ''} label="Ngày tạo" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="updateAt" name='updateAt' value={field.updateAt || ''} label="Ngày cập nhật" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="phoneNumber" name='phoneNumber' value={field.phoneNumber || ''} label="Số điện thoại" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField required id="password" name='password' {...register('password', { required: false })} label="Đặt lại mật khẩu" type="password" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
      <Fab variant="extended" color="error" className='float-right' onClick={handleOpen} type='button'>
        Xóa
      </Fab>
      <Fab variant="extended" color="secondary" className='btn-submit float-right' type='submit'>
        <NavigationIcon sx={{ mr: 1 }}/>
        Cập nhật
      </Fab>
    </Box>
    <Modal
        open={open}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Tài khoản bị xóa sẽ không thể khôi phục. Bạn chắc chắn muốn xóa?
          </Typography>
          <Button variant="text" size="small" onClick={handleCloseDelete}>Đóng</Button>
          <Button variant="contained" className='float-right' color="error" size="small" onClick={handleDelete}>Xóa vĩnh viễn</Button>
        </Box>
      </Modal>
    </>
  )
}
