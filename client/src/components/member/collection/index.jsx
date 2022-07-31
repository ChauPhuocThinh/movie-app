import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './collection.scss'
import Module from '../listType/module'
export default function Collection(props) {
  document.title = 'Bộ sưu tập phim'
  const [field, setField] = useState([])
  const axios = require('axios')
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/favorite/${props.viewer.email}`)
      .then(res => setField(res.data))
      .catch(err => console.log(err))
  },[axios, props])
  if(props.active && props.auth){
    return (
      <>
        <div className='title-tag'>Bộ sưu tập</div>
        <div className="films-list">
          {
            field.map(items => (
              <Module imdbID={items.imdbID} key={items.imdbID} Title={items.Title} 
                TitleVietnamese={items.TitleVietnamese} Type={items.Type} Poster={items.Poster} />
            ))
          }
        </div>
      </>
    )
  }else if(!props.auth){
    return(
      <h3 className='h3-gold'>Bạn cần đăng nhập trước khi truy cập trang này. Nhấp <Link to='/login'>vào đây</Link> để đăng nhập.</h3>
    )
  }else if(!props.active){
    return(
      <h3 className='h3-gold'>Tài khoản này chưa được kích hoạt. Vui lòng kiểm tra  hộp thư email đăng ký của bạn!</h3>
    )
  }
}
