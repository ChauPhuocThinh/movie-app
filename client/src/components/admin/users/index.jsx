import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TableData from '../dataGrid';
import Button from '@mui/material/Button';
export default function Users() {
  const [field, setField] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate();
  const axios = require('axios')
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
    useEffect(()=>{
      const token = getCookie('token_admin')
      axios.defaults.headers.common['cookie-auth-admin'] = token || ''
      axios.get(`${process.env.REACT_APP_API_URL}/admin/users`,{withCredentials: true})
        .then(res => {
          if(res.data !== 'Not permission'){
            setField(res.data)
            setIsAdmin(true)
          }else{
            setIsAdmin(false)
          }
        })
        .catch(err => console.log(err))
    },[axios])
    const listData = field.map(user=>(
      {
        col1: user.fullName, col2: user.email, col3: user.phoneNumber, col4: user.role,
        id: user._id
        
      }
    ))
    const cols = 
      {
        col1: "Tên",
        col2: "Email",
        col3: "Số điện thoại",
        col4: "Quyền hạn",
        id: "id",
      }
    const nameTable = 'Danh sách tài khoản'
    const route = '/admin/users'
  
    
  if(isAdmin){
    return (
      <>
        <TableData listData={listData} cols={cols} nameTable={nameTable} route={route}/>
        <Button variant="contained" className='float-right' style={{'marginTop': '10px'}} 
          onClick={ () => navigate('/admin/users/signup') }
        >Thêm tài khoản</Button>
      </>
    );
  }else{
    return (
      <><h3 className='h3-gold'>Đây là khu vực chỉ dành cho Quản trị viên.</h3></>
    )
  }
}
