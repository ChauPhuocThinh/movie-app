import React from 'react'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
export default function List(props) {
  const {t} = useTranslation()
  return (
    <div className='films-item-list' key={props.imdbID} >
            <img src={props.Poster} className='poster-list' alt={props.Title} onClick={() => window.location.href = `/${props.Type}/${props.imdbID}`}></img>
            <div className='films-content-list' style={{"min-width": props.width}}>
              <div className="columns">
                <div className="column">
                <h3 className='title-vietnamese-list margin-0' onClick={() => window.location.href = `/${props.Type}/${props.imdbID}`}><Link to='#' className='font-h3 underline' >{props.TitleVietnamese}</Link></h3>
                <p className='title-list font-title margin-0'><Link to='#' className='font-title underline'>{props.Title}</Link>(<Link to='#' className="font-year underline">{props.YearNumber}</Link>)</p>
                </div>
                <div className="column">
                    <p className="font-main margin-0" style={{'textAlign': 'right'}}>{props.Runtime} phút</p>
                    <p className="font-normal" style={{'textAlign': 'right'}}><Link to='#' className='font-h3 margin-0 underline'>{props.Country}</Link></p>
                </div>
              </div>
              <div className="intro font-main">{props.PlotVietnamese}</div>
              <div className="columns margin-top-50">
                <div className="column tags">
                  {props.Genre.split(', ').map(tags=>(
                    <Link to='#'className='tag underline' key={tags}>{t(tags)}</Link>
                  ))}
                </div>
                <div className="column imdb-rating">
                  <span className="imdb-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M44 13H4c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V17c0-2.2-1.8-4-4-4z" fill="#ffc107"></path><path d="M28.102 18h-3.704v13.102h3.704c2 0 2.796-.403 3.296-.704.602-.398.903-1.097.903-1.796v-7.903c0-.898-.403-1.699-.903-2-.796-.5-1.097-.699-3.296-.699zm.699 10.3c0 .598-.7.598-1.301.598V20c.602 0 1.3 0 1.3.602zM33.8 18v13.3h2.802s.199-.902.398-.698c.398 0 1.5.597 2.2.597.698 0 1.1 0 1.5-.199.6-.398.698-.7.698-1.3v-7.802c0-1.097-1.097-1.796-2-1.796-.898 0-1.796.597-2.199.898v-3zm3.598 4.2c0-.4 0-.598.403-.598.199 0 .398.199.398.597v6.602c0 .398 0 .597-.398.597-.2 0-.403-.199-.403-.597zM22.7 31.3V18h-4.4l-.8 6.3-1.102-6.3h-4v13.3h2.903v-7.402l1.3 7.403h2l1.297-7.403v7.403zM7.602 18h3.097v13.3H7.602z" fill="#263238"></path></svg>
                  </span>
                  {props.imdbRating}
                </div>
              </div>
            </div>

          </div>
  )
}
