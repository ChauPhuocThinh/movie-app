import React,{ useEffect,useState } from 'react';
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

export default function Create() {
  const axios = require('axios')
  const [Id, setId] = useState('')
  const [biographyVietnamese, setBiographyVietnamese] = useState('')
  const [field, setField] = useState([])
  const [profilePath, setProfilePath] = useState('')
  const [getDataSuccess, setGetDataSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [error, setError] = useState(false)
  const { register, handleSubmit,setValue,formState:{ errors } } = useForm();
  const tmdbAPIkey = '9b5dcc1e39c8b21e4089a56c7e179c89'
  const backdropURL = 'https://image.tmdb.org/t/p/w500'
  const onSubmit = (data) => {
    setLoading(true)
    axios.post(`${process.env.REACT_APP_API_URL}/admin/actors/create`,data)
      .then(res => {
          setLoading(false)
          setAlert(true)
          setField([])
          setId('')
          setBiographyVietnamese('')
          setProfilePath('')
          document.getElementById('standard-search').focus()
      })
      .catch(err => {
        setLoading(false)
        setError(true)})
  }

  const onGetAPI = () => {
    fetch(`https://api.themoviedb.org/3/person/${Id}?api_key=${tmdbAPIkey}&language=en-US`)
        .then(res => res.json())
        .then(field => {
          setField(field);
          setProfilePath(backdropURL + field.profile_path)
          if (field.success === false){
            setGetDataSuccess('False');
          }else {
            setGetDataSuccess('True');
          }
        })
        .catch(err => console.log(err))
  }
  useEffect(()=>{
    if (getDataSuccess === 'True'){
      setValue('name', field.name)
      setValue('birthday', field.birthday)
      setValue('place_of_birth', field.place_of_birth)
      setValue('imdb_id', field.imdb_id)
      setValue('popularity', field.popularity)
      setValue('biography', field.biography)
      setValue('gender', field.gender)
      setValue('profile_path', profilePath)
    }
  },[getDataSuccess,field, setValue, profilePath])
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
      img: profilePath,
      title: '???nh Profile',
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
          Th??m di???n vi??n th??nh c??ng!
        </AlertMui>
      </Snackbar>
    </Stack>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <AlertMui onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          L???i! C?? th??? di???n vi??n b???n v???a th??m ???? c?? s???n, vui l??ng ki???m tra l???i!
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
      <h3 className='h3-gold float-left'>Th??m di???n vi??n</h3>
      <TextField required id="standard-search" name='id' {...register('id',{ required: true })} className='id' 
        label="Nh???p id" type="search" onChange={(e)=>{setId(e.target.value)}} variant="standard" value={Id}
        InputProps={{endAdornment: <InputAdornment position="start"><Button variant="text" endIcon={<SendIcon />} onClick={onGetAPI} >GET</Button></InputAdornment>}}
        />
        
      {errors.imdbID && <Alert severity="warning" className='inline-flex'>H??y nh???p Id di???n vi??n!</Alert>}
      {getDataSuccess === 'False' && <Alert severity="error" className='inline-flex'>L???y d??? li???u th???t b???i! H??y ki???m tra l???i Id</Alert>}
      {getDataSuccess === 'True' && <Alert severity="success" className='inline-flex'>L???y d??? li???u th??nh c??ng!</Alert>}
      <div>
        <TextField disabled id="outlined-search" name='name' value={getDataSuccess === 'True' ? field.name : ''} label="T??n di???n vi??n" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='birthday' value={getDataSuccess === 'True' ? field.birthday : ''} label="Sinh nh???t" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='place_of_birth' value={getDataSuccess === 'True' ? field.place_of_birth : ''} label="N??i sinh" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='imdb_id' value={getDataSuccess === 'True' ? field.imdb_id : ''} label="imdb_id" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='gender' value={getDataSuccess === 'True' ? field.gender : ''} label="Gi???i t??nh" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='popularity' value={getDataSuccess === 'True' ? field.popularity : ''} label="????? n???i ti???ng" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='biography' value={getDataSuccess === 'True' ? field.biography : ''} label="Ti???u s???" type="text" multiline InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField required id="outlined-search" name='biographyVietnamese' {...register('biographyVietnamese', { required: true })} 
          label="Ti???u s??? (Ti???ng Vi???t)" type="text" onChange={(e)=>{setBiographyVietnamese(e.target.value)}} value={biographyVietnamese} multiline InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <input name='profile_path' value={getDataSuccess === 'True' ? profilePath : ''} type="hidden" {...register('profile_path')}/>
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
      { (errors.biographyVietnamese) && <Alert severity="error">H??y ??i???n ?????y ????? c??c tr?????ng b???t bu???c(*) !</Alert>}
      <Fab variant="extended" color="secondary" className='btn-submit float-right' type='submit'>
        <NavigationIcon sx={{ mr: 1 }}/>
        Th??m phim
      </Fab>
    </Box>
    </>
  );
}
