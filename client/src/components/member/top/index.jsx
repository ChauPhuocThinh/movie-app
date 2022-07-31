import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Module from '../listType/module'

export default function Top() {
  const axios = require('axios')
  const [value, setValue] = useState('1');
  const [toDay, setToDay] = useState([])
  const [thisWeek, setThisWeek] = useState([])
  const [thisMonth, setThisMonth] = useState([])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/films-hot-today`)
      .then((res)=>setToDay(res.data))
      .catch(err=>console.log(err))
  },[axios])
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/films-hot-week`)
      .then((res)=>setThisWeek(res.data))
      .catch(err=>console.log(err))
  },[axios])
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/films-hot-month`)
      .then((res)=>setThisMonth(res.data))
      .catch(err=>console.log(err))
  },[axios])
  document.title = 'Phim hot | Phim được xem nhiều nhất'
  return (
    <>
    <h1 className='title-h1'>Top phim được xem nhiều nhất</h1>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value} centered>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} textColor="secondary" indicatorColor="secondary" centered>
            <Tab label="Ngày" value="1" />
            <Tab label="Tuần" value="2" />
            <Tab label="Tháng" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
        <div className="films-list">
          {toDay.map(items =>(
            <Module imdbID={items.imdbID} key={items.imdbID} Title={items.Title} TitleVietnamese={items.TitleVietnamese} 
            Type={items.Type} Poster={items.Poster}/>
          ))}
        </div>
        </TabPanel>
        <TabPanel value="2">
        <div className="films-list">
          {thisWeek.map(items =>(
            <Module imdbID={items.imdbID} key={items.imdbID} Title={items.Title} TitleVietnamese={items.TitleVietnamese} 
            Type={items.Type} Poster={items.Poster}/>
          ))}
        </div>
        </TabPanel>
        <TabPanel value="3">
        <div className="films-list">
          {thisMonth.map(items =>(
            <Module imdbID={items.imdbID} key={items.imdbID} Title={items.Title} TitleVietnamese={items.TitleVietnamese} 
            Type={items.Type} Poster={items.Poster}/>
          ))}
        </div>
        </TabPanel>
      </TabContext>
    </Box>
    </>
  );
}

