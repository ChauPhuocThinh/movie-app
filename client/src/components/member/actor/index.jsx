import {useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import './actor.scss'
export default function Actor() {
  const axios = require('axios')
  const moment = require('moment');
  const {t} = useTranslation()
  const nameActor = window.location.href.replace(`${process.env.REACT_APP_CLIENT_URL}/actor/`,'')
  const [field, setField] = useState([])
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/actor/${nameActor}`)
      .then(res => setField(res.data))
      .catch(err => console.log(err))
  },[axios, nameActor])
  return (
    <>
      <section className="section-actor">
        <div className="container-actor">
          <div className="person-details columns is-variable is-8">
            <div className="column column-left">
              <p className="avatar"><img src={field.profile_path} alt="Chris Pratt" /></p>
              <h3 className="title is-5">Thông tin cá nhân</h3>
              <dl>
                <dt>Nghề nghiệp</dt>
                <dd>Diễn viên</dd>
                <dt>Giới tính</dt>
                <dd>{t(field.gender)}</dd>
                <dt>Ngày sinh</dt>
                <dd>{moment(field.birthday).format("DD/MM/YYYY")}</dd>
                <dt>Nơi sinh</dt>
                <dd>{field.place_of_birth}</dd>
              </dl>
            </div>
            <div className="column main">
              <h1 className="title is-2">{field.name}</h1>
              <h3 className="title is-5">Tiểu sử</h3>
              <div className="bio has-text-grey-light">{field.biographyVietnamese}</div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
