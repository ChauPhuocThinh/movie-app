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
import './create.scss'

const AlertMui = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Create() {
  const axios = require('axios')
  const [imdbID, setIMDBId] = useState('')
  const [field, setField] = useState([])
  const [backdropPath, setBackDropPath] = useState('')
  const [getDataSuccess, setGetDataSuccess] = useState('')
  const [year, setYear] = useState('')
  const [yearNumber, setYearNumber] = useState(0)
  const [runtime, setRuntime] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [error, setError] = useState(false)
  const { register, handleSubmit,setValue,formState:{ errors } } = useForm();
  const omdbAPIKey = '9e022c82'
  const tmdbAPIkey = '9b5dcc1e39c8b21e4089a56c7e179c89'
  const backdropURL = 'https://image.tmdb.org/t/p/original'
  const [plotVietnamese, setPlotVietnamese] = useState('')
  const [source, setSource] = useState('')
  const [titleVietnamese, setTitleVietnamese] = useState('')
  const [trailer, setTrailer] = useState('')
  const changePlotVietnamese = (e)=>{
    setPlotVietnamese(e.target.value)
  }
  const changeSource = (e)=>{
    setSource(e.target.value)
  }
  const changeTitleVietnamese = (e)=>{
    setTitleVietnamese(e.target.value)
  }
  const changeTrailer = (e)=>{
    setTrailer(e.target.value)
  }
  const onSubmit = (data) => {
    setLoading(true)
    axios.post(`${process.env.REACT_APP_API_URL}/admin/films/create`,data)
      .then(res => {
          setLoading(false)
          setAlert(true)
          setTitleVietnamese('')
          setPlotVietnamese('')
          setTrailer('')
          setIMDBId('')
          setBackDropPath('')
          setField([])
          document.getElementById('standard-search').focus()
      })
      .catch(err => {
        setLoading(false)
        setError(true)})
  }
  const onGetAPI = () => {
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${omdbAPIKey}`)
        .then(res => res.json())
        .then(field => {
          setField(field);
          setGetDataSuccess(field.Response);
          fetch(`https://api.themoviedb.org/3/find/${imdbID}?api_key=${tmdbAPIkey}&language=en-US&external_source=imdb_id`)
            .then(res => res.json())
            .then(field2 => {
              if (field.Type === 'movie'){
                setBackDropPath(backdropURL + field2.movie_results[0].backdrop_path)
              }else if (field.Type === 'series'){
                setBackDropPath(backdropURL + field2.tv_results[0].backdrop_path)
              }
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
  }
  useEffect(()=>{
    if(field.Year !== undefined){
      const result = field.Year.split('–')[0]
      const toNumber = parseInt(result)
      setYearNumber(toNumber)
      if ( toNumber < 2012){
        setYear('-2012')
      }else{ 
        setYear(result) 
      }
    }
  },[field, year,yearNumber])
  useEffect(()=>{
    if(field.Runtime !== undefined){
      const result = field.Runtime.split(' ')[0]
      if (field.Runtime === 'N/A'){
        setRuntime('0')
      }else{
        setRuntime(result)
      }
    }
  },[field, runtime])
  useEffect(()=>{
    if (getDataSuccess === 'True'){
      setValue('Title', field.Title)
      setValue('Year', year)
      setValue('Released', field.Released)
      setValue('Rated', field.Rated)
      setValue('Runtime', runtime)
      setValue('Type', field.Type)
      setValue('Genre', field.Genre)
      setValue('Director', field.Director)
      setValue('Actors', field.Actors)
      setValue('Country', field.Country)
      setValue('Poster', field.Poster)
      setValue('Backdrop', backdropPath)
      setValue('Plot', field.Plot)
      setValue('imdbVotes', field.imdbVotes)
      setValue('imdbRating', field.imdbRating)
      setValue('YearNumber', yearNumber)
    }
  },[getDataSuccess,field, setValue, backdropPath, year, runtime, yearNumber])
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
      img: backdropPath,
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
          Đăng phim thành công!
        </AlertMui>
      </Snackbar>
    </Stack>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <AlertMui onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Lỗi! Có thể phim bạn vừa thêm đã có sẵn, vui lòng kiểm tra lại!
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
      <h3 className='h3-gold float-left'>Thêm phim</h3>
      <TextField required id="standard-search" name='imdbID' {...register('imdbID',{ required: true })} className='id' 
        label="Nhập IMDb id" type="search" onChange={(e)=>{setIMDBId(e.target.value)}} variant="standard" value={imdbID}
        InputProps={{endAdornment: <InputAdornment position="start"><Button variant="text" endIcon={<SendIcon />} onClick={onGetAPI} >GET</Button></InputAdornment>}}
        />
        
      {errors.imdbID && <Alert severity="warning" className='inline-flex'>Hãy nhập IMDB ID!</Alert>}
      {getDataSuccess === 'False' && <Alert severity="error" className='inline-flex'>Lấy dữ liệu thất bại! Hãy kiểm tra lại IMDB ID</Alert>}
      {getDataSuccess === 'True' && <Alert severity="success" className='inline-flex'>Lấy dữ liệu thành công!</Alert>}
      <div>
        <TextField disabled id="outlined-search" name='Title' value={getDataSuccess === 'True' ? field.Title : ''} label="Tên phim (Tiếng Anh)" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField required id="outlined-search" name='TitleVietnamese' {...register('TitleVietnamese', { required: true })} onChange={changeTitleVietnamese} value={titleVietnamese} label="Tên phim (Tiếng Việt)" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Year' value={getDataSuccess === 'True' ? year : ''} label="Năm sản xuất" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Released' value={getDataSuccess === 'True' ? field.Released : ''} label="Thời gian ra mắt" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Rated' value={getDataSuccess === 'True' ? field.Rated : ''} label="Giới hạn độ tuổi" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Runtime' value={getDataSuccess === 'True' ? runtime : ''} label="Thời lượng" type="number" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Type' value={getDataSuccess === 'True' ? field.Type : ''} label="Loại" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Genre' value={getDataSuccess === 'True' ? field.Genre : ''} label="Thể loại" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Director' value={getDataSuccess === 'True' ? field.Director : ''} label="Đạo diễn" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Actors' value={getDataSuccess === 'True' ? field.Actors : ''} label="Diễn viên" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Country' value={getDataSuccess === 'True' ? field.Country : ''} label="Quốc gia" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <input name='Poster' value={getDataSuccess === 'True' ? field.Poster : ''} type="hidden" {...register('Poster')}/>
        <input name='Backdrop' value={getDataSuccess === 'True' ? backdropPath : ''} type="hidden" {...register('Backdrop')}/>
        <input name='YearNumber' value={getDataSuccess === 'True' ? yearNumber : ''} type="hidden" {...register('YearNumber')}/>
        <TextField required id="outlined-search" name='Source' className='Source' {...register('Source', { required: false })} onChange={changeSource} value={source} label="Nguồn phim, các tập cách nhau bởi dấu , " type="text" multiline InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField id="outlined-search" name='Subtitle' label="Upload phụ đề"type="file" InputLabelProps={{shrink: true,}} />
        <TextField required id="outlined-search" name='Trailer' {...register('Trailer', { required: true })} onChange={changeTrailer} value={trailer} label="Trailer-id Youtube, cách nhau bởi dấu , " type="text" multiline InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='imdbVotes' value={getDataSuccess === 'True' ? field.imdbVotes : ''} label="Bình chọn IMDB" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='imdbRating' value={getDataSuccess === 'True' ? field.imdbRating : ''} label="Điểm IMDB" type="text" InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField disabled id="outlined-search" name='Plot' value={getDataSuccess === 'True' ? field.Plot : ''} label="Mô tả phim" type="text" multiline InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        <TextField required id="outlined-search" name='PlotVietnamese' {...register('PlotVietnamese', { required: true })} onChange={changePlotVietnamese} value={plotVietnamese} label="Mô tả phim (Tiếng Việt)" type="text" multiline InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment>}}/>
        
        <input name='Status' value='false' type="hidden" {...register('Status')}/>
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
        Thêm phim
      </Fab>
    </Box>
    </>
  );
}
