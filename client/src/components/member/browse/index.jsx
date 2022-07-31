import React,{useState, useEffect} from 'react'
import Module from '../listType/module'
import List from '../listType/list'
import Filter from '../filter'
import {useNavigate} from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export default function Browse() {
  const axios = require('axios')
  const [genre, setGenre] = useState('')
  const [country, setCountry] = useState('')
  const [year, setYear] = useState('')
  const [duration, setDuration] = useState('')
  const [sort, setSort] = useState('&sort=createdAt')
  const [req, setReq] = useState('')
  const [field, setField] = useState([])
  const [page, setPage] = useState(1)
  const [countPage, setCountPage] = useState(1)
  const [widthList, setWidthList] = useState(0)
  const navigate = useNavigate();
  useEffect(()=>{
      setReq('/browse?'+genre+country+year+duration+sort+`&page=${page}`)
  },[genre, country, year, duration,sort, req, page])
  useEffect(()=>{
      navigate(req)
  },[req, navigate])
  const onSetGenre = (e)=>{
    if (e.target.value === 'all'){
      setGenre('')
    }else{setGenre('&Genre='+e.target.value)}
  }
  const onSetCountry = (e)=>{
    if (e.target.value === 'all'){
      setCountry('')
    }else{setCountry('&Country='+e.target.value)}
  }
  const onSetYear = (e)=>{
    if (e.target.value === 'all'){
      setYear('')
    }else{setYear('&YearNumber='+e.target.value)}
  }
  const onSetDuration = (e)=>{
    if (e.target.value === 'all'){
      setDuration('')
    }else {setDuration('&Runtime='+e.target.value)}
  }

  const onSetSort = (e)=>{setSort('&sort='+e.target.value)}
  
  const [typeArrangeIsList, setTypeArrangeIsList] = useState(false)
  const handleArrangeList = () => {
    if ( typeArrangeIsList === false){
      setTypeArrangeIsList(!typeArrangeIsList)
      document.getElementById('list').classList.add('icon-arrange-dark')
      document.getElementById('module').classList.remove('icon-arrange-dark')
    }
  }
  const handleArrangeModule = () => {
    if (typeArrangeIsList === true){
      setTypeArrangeIsList(!typeArrangeIsList)
      document.getElementById('module').classList.add('icon-arrange-dark')
      document.getElementById('list').classList.remove('icon-arrange-dark')
    }
  }
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}${req}`)
      .then(res => {
        setField(res.data.films)
        setCountPage(res.data.pages)
      })
      .catch(err => console.error(err))
  },[req,axios])

  const handleChangePage = (event, value) => {
    setPage(value)
  };
  useEffect(()=>{
    document.title = 'Phim online chất lượng cao'
    setWidthList(document.getElementById('filter').clientWidth - 174)
  },[])
  return (
    <>
    <Filter onSetGenre={onSetGenre} onSetCountry={onSetCountry} 
      onSetYear={onSetYear} onSetDuration={onSetDuration}  onSetSort={onSetSort}
      onArrangeList={handleArrangeList} onArrangeModule={handleArrangeModule}/>
      <div className="films-list">
      { !typeArrangeIsList && typeof field !== 'undefined' &&
        field.map(items=>(
          <Module imdbID={items.imdbID} key={items.imdbID} Title={items.Title} 
          TitleVietnamese={items.TitleVietnamese} Type={items.Type} Poster={items.Poster} />
        ))}
        { typeArrangeIsList && typeof field !== 'undefined' &&
        field.map(items=>(
          <List 
            imdbID={items.imdbID} Title={items.Title} Poster={items.Poster} Type={items.Type} Year={items.Year} width={widthList}
            TitleVietnamese={items.TitleVietnamese} key={items.imdbID} Runtime={items.Runtime} Genre={items.Genre}
            Country={items.Country} PlotVietnamese={items.PlotVietnamese} imdbRating={items.imdbRating} YearNumber={items.YearNumber}
          />
        ))
        }
      </div>
      <Stack spacing={2} className='pagination'>
        <Pagination count={countPage} onChange={handleChangePage}
          color="secondary" shape="rounded" variant="outlined" size="large"/>
      </Stack>
    </>
  )
}
