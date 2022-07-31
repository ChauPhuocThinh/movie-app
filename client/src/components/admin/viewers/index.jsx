import React from 'react'
import { useEffect, useState } from 'react'
import TableData from '../dataGrid';
export default function Viewers() {
  const [field, setField] = useState([])
  const axios = require('axios')
    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_API_URL}/admin/viewers`)
        .then(res => setField(res.data))
        .catch(err => console.log(err))
    },[axios])
    const listData = field.map(viewer=>(
      {
        col1: viewer.fullName, col2: viewer.email, col3: viewer.activedEmail, col4: viewer.coin,
        id: viewer._id
        
      }
    ))
    const cols = 
      {
        col1: "Tên",
        col2: "Email",
        col3: "Trạng thái",
        col4: "Số dư (đồng)",
        id: "id",
      }
    const nameTable = 'Danh sách người xem'
    const route = '/admin/viewers'
    
  return (
    <TableData listData={listData} cols={cols} nameTable={nameTable} route={route}/>
  );
}
