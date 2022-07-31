import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.scss"
import Slider from "react-slick";
import {useNavigate} from 'react-router-dom'
export function ActorSlider(props) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  const navigate = useNavigate()
  const onClickName = (actor) => (e) => {
    if(actor !== null){
      navigate(`/actor/${actor.name}`)
    }
  }
  return (
    <Slider {...settings} className='actor-slider'>
      <div>
        <img src={props.actor1 !== null ? props.actor1.profile_path: 'https://media.istockphoto.com/illustrations/blank-man-profile-head-icon-placeholder-illustration-id1298261537?k=20&m=1298261537&s=612x612&w=0&h=8plXnK6Ur3LGqG9s-Xt2ZZfKk6bI0IbzDZrNH9tr9Ok='} alt='Profile' />
        <p onClick={onClickName(props.actor1)}>{props.actors[0]}</p>
      </div>
      <div>
        <img src={props.actor2 !== null ? props.actor2.profile_path: 'https://media.istockphoto.com/illustrations/blank-man-profile-head-icon-placeholder-illustration-id1298261537?k=20&m=1298261537&s=612x612&w=0&h=8plXnK6Ur3LGqG9s-Xt2ZZfKk6bI0IbzDZrNH9tr9Ok='} alt='Profile' />
        <p onClick={onClickName(props.actor2)}>{props.actors[1]}</p>
      </div>
      <div>
        <img src={props.actor3 !== null ? props.actor3.profile_path: 'https://media.istockphoto.com/illustrations/blank-man-profile-head-icon-placeholder-illustration-id1298261537?k=20&m=1298261537&s=612x612&w=0&h=8plXnK6Ur3LGqG9s-Xt2ZZfKk6bI0IbzDZrNH9tr9Ok='} alt='Profile' />
        <p onClick={onClickName(props.actor3)}>{props.actors[2]}</p>
      </div>
    </Slider>
  );
}
export function TrailerSlider(props) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const onClickTrailer = (trailer) => (e) => {
    window.open(
      `https://www.youtube.com/watch?v=${trailer}`,
      '_blank'
    );
  }
  return (
    <Slider {...settings} className='trailer-slider'>
      {props.trailers !== null  && props.trailers !== '' &&
      props.trailers.map(trailer => (
        <div key={trailer}>
          <img src={`https://img.youtube.com/vi/${trailer}/hqdefault.jpg`} alt='trailer' key={trailer} onClick={onClickTrailer(trailer)}/>
        </div>
      ))
      }
    </Slider>
  );
}