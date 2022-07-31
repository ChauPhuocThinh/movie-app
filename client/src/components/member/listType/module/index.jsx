import React from 'react'
export default function Module(items) {
  return (
    <div className='films-item' key={items.imdbID} onClick={() => window.location.href = `/${items.Type}/${items.imdbID}`}>
      <img src={items.Poster} className='poster' alt={items.Title}></img>
      <p className='limit-276'>{items.TitleVietnamese}</p>
      <p className='font-title limit-276'>{items.Title}</p>
  </div>
  )
}
