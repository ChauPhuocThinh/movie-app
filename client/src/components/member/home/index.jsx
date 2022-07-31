import {useEffect, useState } from 'react'
import Module from '../listType/module'
import './home.scss'
export default function Home() {
  const axios = require('axios')
  const [field, setField] = useState([])
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}`)
      .then(res => setField(res.data))
      .catch(err => console.log(err))
  },[axios])
  return (
    <>
    <div className='title-tag'>Phim đề cử</div>
    <div className='films-list'>
      {
      field.map(items=>(
        <Module imdbID={items.imdbID} key={items.imdbID} Title={items.Title} 
        TitleVietnamese={items.TitleVietnamese} Type={items.Type} Poster={items.Poster} />
      ))}
    </div>
    
    </>
  )
}
