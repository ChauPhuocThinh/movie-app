import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './updateViewer.scss'
export default function UpdateViewer() {
  const location = useLocation()
  const Id = location.pathname.replace('/admin/viewers/','')
  const axios = require('axios')
  const moment = require('moment');
  const [field, setField] = useState([])
  const [createdAt, setCreatedAt] = useState('') 
  const [views, setViews] = useState(0)
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/admin/viewers/${Id}`)
      .then(res => {
        setField(res.data)
        setCreatedAt(moment(res.data.createdAt).format("DD/MM/YYYY hh:mm"))
        setViews(res.data.collectionFilms.length)
      })
      .catch(err => console.log(err))
  },[axios, Id, moment])
  return (
    <>
    <div className="has-text-center">
        <h1 className="title is-3">{field.fullName}</h1>
        <p>Ngày gia nhập: <b>{createdAt}</b></p>
        <p>Email: <b>{field.email}</b></p>
        <p>Trạng thái kích hoạt: <b>{String(field.activedEmail)}</b></p>
        <p>Số lượt xem phim: <b>{views}</b></p>
    </div>
    </>
  )
}
