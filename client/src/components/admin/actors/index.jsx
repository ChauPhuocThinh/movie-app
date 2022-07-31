import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import TableData from '../dataGrid';
import Button from '@mui/material/Button';
export default function Actors() {
    const [field, setField] = useState([])
    const navigate = useNavigate();
    const {t} = useTranslation()
    const axios = require('axios')
    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_API_URL}/admin/actors`)
        .then(res => setField(res.data))
        .catch(err => console.log(err))
    },[axios])
    const listData = field.map(actors=>(
      {
        col1: actors.name, col2: actors.place_of_birth, col3: actors.birthday, col4: t(actors.gender),
        id: actors.id
        
      }
    ))
    const cols = 
      {
        col1: "Tên",
        col2: "Nơi sinh",
        col3: "Ngày sinh",
        col4: "Giới tính",
        col5: "Hành động",
        id: "Id",
      }
    const nameTable = 'Danh sách diễn viên'
    const route = '/admin/actors'
    
  return (
    <>
      <TableData listData={listData} cols={cols} nameTable={nameTable} route={route}/>
      <Button variant="contained" className='float-right' style={{'marginTop': '10px'}} 
          onClick={ () => navigate('/admin/actors/create') }
        >Thêm diễn viên</Button>
    </>
  );
}
