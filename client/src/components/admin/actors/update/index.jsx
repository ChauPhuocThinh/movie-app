import React,{ useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import NavigationIcon from '@mui/icons-material/Navigation';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import Alert from '@mui/material/Alert';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AlertMui = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UpdateActor() {
  const axios = require('axios')
  const location = useLocation()
  const Id = location.pathname.replace('/admin/actors/','')
  const [field, setField] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [error, setError] = useState(false)
  const { register, handleSubmit,formState:{ errors } } = useForm();
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/admin/actors/${Id}`)
      .then(res => setField(res.data))
      .catch(err => console.error(err))
  },[axios,Id])
  const onSubmit = (data) => {
    setLoading(true)
    axios.put(`${process.env.REACT_APP_API_URL}/admin/actors/${Id}/update`,data)
    .then(res => {
        setLoading(false)
        setAlert(true)
    })
    .catch(err => {
      setLoading(false)
      setError(true)})
  }
  const srcset = function (image, size, rows = 1, cols = 1){
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  const itemData = [
    {
      img: field.profile_path,
      title: 'Ảnh Profile',
      id: 1,
      rows: 2,
      cols: 1,
    }
  ];
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
    setError(false)
  };
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
          Cập nhật diễn viên thành công!
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
      <h3 className='h3-gold float-left'>Thêm diễn viên</h3>
      <TextField required id="standard-search" name='id' className='id' 
        label="Nhập id" type="search" variant="standard" value={field.id || ''}
        InputProps={{endAdornment: <InputAdornment position="start"><Button variant="text" endIcon={<SendIcon />}>GET</Button></InputAdornment>}}
        />
      <div>
        <TextField disabled id="outlined-search" name='name' value={field.name || ''} label="Tên diễn viên" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='birthday' value={field.birthday || ''} label="Sinh nhật" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='place_of_birth' value={field.place_of_birth || ''} label="Nơi sinh" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='imdb_id' value={field.imdb_id || ''} label="imdb_id" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='gender' value={field.gender || ''} label="Giới tính" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='popularity' value={field.popularity || ''} label="Độ nổi tiếng" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='biography' value={field.biography || ''} label="Tiểu sử" type="text" multiline InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField required id="outlined-search" name='biographyVietnamese' {...register('biographyVietnamese', { required: true })} defaultValue={field.biographyVietnamese || ''}
          label="Tiểu sử (Tiếng Việt)" type="text" multiline InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <ImageList
          sx={{ width: 500, height: 450 }}
          variant="quilted"
          cols={4}
          rowHeight={121}
        >
          {itemData.map((item) => (
            <ImageListItem key={item.id} cols={item.cols || 1} rows={item.rows || 1}>
              <img
                {...srcset(item.img, 121, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                title={item.title}
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: 'white' }}
                    aria-label={`star ${item.title}`}
                  >
                    
                  </IconButton>
                }
                actionPosition="left"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      { (errors.biographyVietnamese) && <Alert severity="error">Hãy điền đầy đủ các trường bắt buộc(*) !</Alert>}
      <Fab variant="extended" color="secondary" className='btn-submit float-right' type='submit'>
        <NavigationIcon sx={{ mr: 1 }}/>
        Cập nhật
      </Fab>
    </Box>
    </>
  );
}
