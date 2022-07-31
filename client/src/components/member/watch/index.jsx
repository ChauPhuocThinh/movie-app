import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import ReactPlayer from 'react-player'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './watch.scss'
export default function Watch(props) {
  const location = useLocation()
  const id = location.pathname.replace('/watch/','')
  const axios = require('axios')
  const [field, setField] = useState([])
  const [source, setSource] = useState('')
  const [episodes, setEpisodes] = useState()
  const [type, setType] = useState('')
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/watch/${id}`)
        .then((res) => {
          document.title = res.data.TitleVietnamese
          setField(res.data)
          axios.put(`${process.env.REACT_APP_API_URL}/add-collections/${props.viewer.email}`,{
            imdbID: id,
            _id: id,
            Title: res.data.Title,
            TitleVietnamese: res.data.TitleVietnamese,
            Poster: res.data.Poster,
            Type: res.data.Type,
            watched: true
          })
        })
        .catch(err=>console.log(err))
  },[axios, id,props])
  useEffect(()=>{
    if(field.Type === 'movie'){
      setSource(field.Source)
      setType('movie')
    }else if(field.Type === 'series'){
      setEpisodes(field.Source.split(','))
      setType('series')
      setSource(field.Source.split(',')[0])
    }
  },[field])

  const handleChange = (event, ep) => {
    setSource(ep)
  };
  return (
    <>
    <div className="player-wrapper">
      <ReactPlayer
        width='100%'
        height='400px'
        playing
        url={'https://www.youtube.com/embed/' + source + `?showinfo=0&enablejsapi=1&origin=${process.env.REACT_APP_CLIENT_URL}`}
        controls
        
      />
    </div>
    {type === 'series' && 
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={source}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          { episodes !== [] && 
            episodes.map(ep => (
              <Tab value={ep} label={`Tập ${episodes.indexOf(ep) + 1}`} key={ep} />
            ))
          }
        </Tabs>
      </Box>
    }
    <div className="watch">
      <h1 className="title is-2">{field.Title}</h1>
      <h2 className="subtitle is-4">{field.TitleVietnamese} (<a href="/year/2016">{field.Year}</a>)</h2>  
    </div>
    {/* <div id="fb-root"></div>
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v14.0" nonce="28huulCC"></script>
    <div class="fb-comments" data-href='${process.env.REACT_APP_CLIENT_URL}/movie/tt10872600' data-width="1000" data-numposts="5"></div> */}
    </>
  )
}
