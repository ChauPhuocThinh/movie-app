import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box';
import Module from '../listType/module'
export default function Search() {
  const axios = require('axios')
  const [query, setQuery] = useState('')
  const [field, setField] = useState([])
  const navigate = useNavigate();
  useEffect(()=>{
    document.title = 'Tìm kiếm phim'
    axios.get(`${process.env.REACT_APP_API_URL}/search?q=${query}`)
      .then(res=>setField(res.data))
      .catch(err=>console.log(err))
  },[axios,query])
  useEffect(()=>{
    document.getElementById('outlined-basic').focus()
  },[])
  useEffect(()=>{
    navigate(`/search?q=${query}`)
  },[query, navigate])
  return (
    <>
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Nhập tên phim" variant="outlined" className='search-form'
        onChange={(e) => setQuery(e.target.value)}/>
    </Box>
    <div className='films-list'>
    {field.map(items=>(
        <Module imdbID={items.imdbID} key={items.imdbID} Title={items.Title} TitleVietnamese={items.TitleVietnamese} 
          Type={items.Type} Poster={items.Poster}/>
        ))
    }
    </div>
      
    </>
    
  )
}
