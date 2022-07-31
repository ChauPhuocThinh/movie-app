import React,{useEffect, useState} from 'react'
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
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
import './updateFilm.scss'
import { useLocation } from 'react-router-dom';

const AlertMui = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

export default function UpdateFilm() {
  const location = useLocation()
  const imdbId = location.pathname.replace('/admin/films/','')
  const axios = require('axios')
  const [field, setField] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [error, setError] = useState(false)
  const { register, handleSubmit,formState:{ errors } } = useForm();
  const onSubmit = (data) => {
    setLoading(true)
    axios.put(`${process.env.REACT_APP_API_URL}/admin/films/${imdbId}/update`,data)
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
      img: field.Poster,
      title: 'Ảnh Poster',
      id: 1,
      rows: 2,
      cols: 1,
    },
    {
      img: field.Backdrop,
      title: 'Ảnh Backdrop',
      id: 2,
      rows: 2,
      cols: 3,
    }
  ];
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
    setError(false)
  };
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/admin/films/${imdbId}`)
      .then(res => res.data)
      .then(field => setField(field))
      .catch(err => console.error(err))
  },[axios,imdbId])
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
          Cập nhật phim thành công!
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
      <h3 className='h3-gold float-left'>Chỉnh sửa thông tin phim</h3>
      <TextField required id="standard-search" name='imdbID' className='id' 
        label="Nhập IMDb id" type="search" variant="standard" value={field.imdbID || ''}
        />
      <div>
        <TextField disabled id="outlined-search" name='Title' value={field.Title || ''} label="Tên phim (Tiếng Anh)" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField required id="outlined-search" name='TitleVietnamese' {...register('TitleVietnamese', { required: true })} defaultValue={field.TitleVietnamese || ''} label="Tên phim (Tiếng Việt)" type="text" multiline InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Year' value={field.Year || ''} label="Năm sản xuất" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Released' value={field.Released || ''} label="Thời gian ra mắt" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Rated' value={field.Rated || ''} label="Giới hạn độ tuổi" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Runtime' value={field.Runtime || ''} label="Thời lượng" type="number" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Type' value={field.Type || ''} label="Loại" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Genre' value={field.Genre || ''} label="Thể loại" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Director' value={field.Director || ''} label="Đạo diễn" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Actors' value={field.Actors || ''} label="Diễn viên" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Country' value={field.Country || ''} label="Quốc gia" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField required id="outlined-search" name='Source' className='Source' {...register('Source', { required: true })} defaultValue={field.Source || ''} label="Nguồn phim, các tập cách nhau bởi dấu , " type="text" multiline InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField id="outlined-search" name='Subtitle' label="Upload phụ đề" type="file" InputLabelProps={{shrink: true,}} />
        <TextField required id="outlined-search" name='Trailer' {...register('Trailer', { required: true })} defaultValue={field.Trailer || ''} label="Trailer-id Youtube, cách nhau bởi dấu , " type="text" multiline InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='imdbVotes' value={field.imdbVotes || ''} label="Bình chọn IMDB" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='imdbRating' value={field.imdbRating || ''} label="Điểm IMDB" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Plot' value={field.Plot || ''} label="Mô tả phim" type="text" multiline InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField required id="outlined-search" name='PlotVietnamese' {...register('PlotVietnamese', { required: true })} defaultValue={field.PlotVietnamese || ''} label="Mô tả phim (Tiếng Việt)" type="text" multiline InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <input type='hidden' name='Status' id='Status' defaultValue={field.Status || false}></input>
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
      { (errors.TitleVietnamese || errors.PlotVietnamese || errors.Trailer) && !errors.imdbID && <Alert severity="error">Hãy điền đầy đủ các trường bắt buộc(*) !</Alert>}
      <Fab variant="extended" color="secondary" className='btn-submit float-right' type='submit'>
        <NavigationIcon sx={{ mr: 1 }}/>
        Cập nhật
      </Fab>
    </Box>
    </>
  )
}
