import React,{useState, useEffect} from 'react'
import Module from '../listType/module'
export default function Movie() {
  const axios = require('axios')
  const [field, setField] = useState([])
  useEffect(()=>{
    document.title = 'Phim lẻ | phim chiếu rạp hay nhất'
    axios.get(`${process.env.REACT_APP_API_URL}/movie`)
      .then(res => setField(res.data))
      .catch(err => console.log(err))
  },[axios])
  return (
    <>
    <div className="title-tag">Phim lẻ</div>
    <div className="films-list">
      {field.map(items =>(
        <Module imdbID={items.imdbID} key={items.imdbID} Title={items.Title} TitleVietnamese={items.TitleVietnamese} 
        Type={items.Type} Poster={items.Poster}/>
      ))}
    </div>
    </>
  )
}
