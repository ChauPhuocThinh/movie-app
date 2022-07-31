import React,{ useState,useEffect } from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'
import './movieDetail.scss'
import {ActorSlider, TrailerSlider} from '../../slider'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export default function MovieDetail(props) {
  // const navigate = useNavigate();
  const axios = require('axios')
  const {t} = useTranslation()
  const [field, setField] = useState([])
  const [actors, setActors] = useState('')
  const [trailers, setTrailers] = useState('')
  const [favoriteAdded, setFavoriteAdded] = useState(false)
  const [loading, setLoading] = useState('none')
  const id = window.location.href.replace(`${process.env.REACT_APP_CLIENT_URL}/movie/`,'')
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/movie/${id}`)
      .then(res=>{
        document.title = res.data.TitleVietnamese
        setField(res.data)
        setActors(res.data.Actors.split(', '))
        setTrailers(res.data.Trailer.split(','))
      })
      .catch(err=>console.log(err))
    },[axios, id])
    const moment = require('moment');
    const time = moment(field.Released);
    const [actor1, setActor1] = useState([])
    const [actor2, setActor2] = useState([])
    const [actor3, setActor3] = useState([])
    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_API_URL}/actor/${actors[0]}`)
        .then(res=>setActor1(res.data))
        .catch(err=>console.log(err))
    },[axios, actors])
    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_API_URL}/actor/${actors[1]}`)
        .then(res=>setActor2(res.data))
        .catch(err=>console.log(err))
    },[axios, actors])
    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_API_URL}/actor/${actors[2]}`)
        .then(res=>setActor3(res.data))
        .catch(err=>console.log(err))
    },[axios, actors])
    const addFavorite = () => {
      setLoading('flex')
      axios.put(`${process.env.REACT_APP_API_URL}/add-favorite/${props.viewer.email}`,field)
        .then(res => {
          if(res.data === 'updated'){
            setFavoriteAdded(true)
            setLoading('none')
          }
        })
        .catch(err => console.log(err))
    }
    const removeFavorite = () => {
      setLoading('flex')
      axios.put(`${process.env.REACT_APP_API_URL}/remove-favorite/${props.viewer.email}`,{imdbID: field.imdbID})
        .then(res => {
          if(res.data === 'updated'){
            setFavoriteAdded(false)
            setLoading('none')
          }
        })
        .catch(err => console.log(err))
    }
    useEffect(()=>{
      axios.post(`${process.env.REACT_APP_API_URL}/check-favorite/${props.viewer.email}`,{imdbID: field.imdbID})
        .then(res => setFavoriteAdded(res.data.added))
        .catch(err => console.log(err))
    },[axios, props, field])
  return (
    <>
    <div className="backdrop" style={{backgroundImage: `url(${field.Backdrop})`}}></div>
    <div className="section">
      <div className="shiftup">
        <div className="columns details is-variable is-8">
          <div className="column column-left">
            <p className="cover has-text-centered">
              <img src={field.Poster} alt='Poster' className='poster-img'/>
            </p>
            {
              field.Source !== '' && typeof field.Source !== 'undefined' ? 
              <Link className="watch button is-danger is-medium is-fullwidth" to={`/watch/${field.imdbID}`}>
                Xem phim
              </Link> :
              <Link className="watch button is-warning is-medium is-fullwidth disabled" to={`/watch/${field.imdbID}`}>
                Đang xử lý
              </Link>
            }
          </div>
          <div className="column main">
            <h1 className="title is-2">{field.Title}</h1>
            <h2 className="subtitle is-4">{field.TitleVietnamese} (<a href="/year/2016">{field.Year}</a>)</h2>
            <div className="meta"><span className="content-rating tag-detail is-dark has-text-weight-bold" title="">{field.Rated}</span></div>
            <div className="meta"><span className="imdb-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M44 13H4c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V17c0-2.2-1.8-4-4-4z" fill="#ffc107"></path><path d="M28.102 18h-3.704v13.102h3.704c2 0 2.796-.403 3.296-.704.602-.398.903-1.097.903-1.796v-7.903c0-.898-.403-1.699-.903-2-.796-.5-1.097-.699-3.296-.699zm.699 10.3c0 .598-.7.598-1.301.598V20c.602 0 1.3 0 1.3.602zM33.8 18v13.3h2.802s.199-.902.398-.698c.398 0 1.5.597 2.2.597.698 0 1.1 0 1.5-.199.6-.398.698-.7.698-1.3v-7.802c0-1.097-1.097-1.796-2-1.796-.898 0-1.796.597-2.199.898v-3zm3.598 4.2c0-.4 0-.598.403-.598.199 0 .398.199.398.597v6.602c0 .398 0 .597-.398.597-.2 0-.403-.199-.403-.597zM22.7 31.3V18h-4.4l-.8 6.3-1.102-6.3h-4v13.3h2.903v-7.402l1.3 7.403h2l1.297-7.403v7.403zM7.602 18h3.097v13.3H7.602z" fill="#263238"></path></svg></span><span className="has-text-weight-bold">{field.imdbRating}</span>
            </div>
            <div className="level genres">
              <div className="level-left">
              <div className="level-item">
                <div className="dropdown is-hoverable">
                  <div className="dropdown-trigger">
                    {favoriteAdded === false ?
                      <button className="add-favorite button is-info is-outlined unadded" onClick={addFavorite}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                          <path d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path>
                        </svg> Muốn Xem
                        <Box sx={{ display: loading }}>
                          <CircularProgress size={20}/>
                        </Box>
                      </button>
                      :
                      <button className="remove-favorite button is-info is-outlined unadded" onClick={removeFavorite}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                          <path d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path>
                        </svg> xoá khỏi Bộ Sưu Tập
                        <Box sx={{ display: loading }}>
                          <CircularProgress size={20}/>
                        </Box>
                      </button>
                    }
                  </div>
                </div>
              </div>
              </div>
              <div className="level-right">
                <div className="level-item buttons">
                  {typeof field.Genre !== 'undefined' && field.Genre.split(', ').map(genre => (
                    <a className="button is-link is-small is-rounded is-inverted is-outlined" href={`/genre/${genre}`} key={genre}>{t(genre)}</a>
                  ))}
                </div>
              </div>
            </div>
            <dl className="horizontal-dl">
              <dt>Sáng lập</dt>
                <dd className="csv">
                  <a href="/person/matt-duffer~63472">{field.Director}</a>
                </dd>
              <dt>Quốc gia</dt>
                <dd className="csv">
                  {typeof field.Country !== 'undefined' && field.Country.split(', ').map(country=>(
                    <a href="/person/matt-duffer~63472" key={country}>{t(country)}</a>
                  ))}
                </dd>
              <dt>Khởi chiếu</dt>
                <dd>{typeof field.Released !== 'undefined' && time.format("DD/MM/YYYY")}</dd>
            </dl>
            <div className="intro has-text-grey-light">{field.PlotVietnamese}</div>
            <h3 className="section-header">Diễn viên</h3>
            <ActorSlider actor1={actor1} actor2={actor2} actor3={actor3} actors={actors}/>
            <h3 className="section-header">Trailer</h3>
            <TrailerSlider trailers={trailers}/>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
