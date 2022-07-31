import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TableData from '../dataGrid';
import Button from '@mui/material/Button';
export default function Films() {
    const axios = require('axios')
    const [field, setField] = useState([])
    const { t } = useTranslation()
    const navigate = useNavigate();
    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_API_URL}/admin/films`)
        .then(res => setField(res.data))
        .catch(err => console.log(err))
    },[axios])
    for(var i = 0; i < field.length; i++){
      if(field[i].Source){
        field[i].Status = true
      }else field[i].Status = false
    }
    const listData = field.map(films=>(
      {
        col1: films.Title, col2: films.TitleVietnamese, col3: t(films.Type), col4: t(films.Status),
        id: films.imdbID
        
      }
    ))
    const cols = 
      {
        col1: "Tên phim",
        col2: "Tên Tiếng Việt",
        col3: "Loại",
        col4: "Tình trạng",
        col5: "Hành động",
        id: "imdb ID",
      }
    const nameTable = 'Danh sách phim'
    const route = '/admin/films'
    
  return (
    <>
      <TableData listData={listData} cols={cols} nameTable={nameTable} route={route}/>
      <Button variant="contained" className='float-right' style={{'marginTop': '10px'}} 
          onClick={ () => navigate('/admin/films/create') }
        >Thêm phim</Button>
    </>
  );
}