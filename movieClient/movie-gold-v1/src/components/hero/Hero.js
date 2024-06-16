import './Hero.css'
import Carousel from 'react-material-ui-carousel';
import {Paper} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Hero = ({movies}) => {
  return (
    <div>
        <Carousel>
            {
                movies?.map((movie) => {
                    return (
                        <Paper>
                            <div className = "movie-card-container">
                            <div className="movie-card" style={{"--img": `url(${movie.backdrops[0]})`}}>
                                <div className="movie-detail">
                                    <div className="movie-poster">
                                        <img src={movie.poster} alt="" />
                                    </div>
                                    <div className="movie-title">
                                        <h4>{movie.title}</h4>
                                    </div>
                                    <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length -11)}`}>
                                    <div className="movie-buttons-container">
                                        <div className="play-button-icon-container">
                                            <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay}/>
                                        </div>
                                    </div>
                                    </Link>
                                </div>

                            </div>
                            </div>
                        </Paper>
                    )
                })
            }
        </Carousel>
    </div>
  )
}

export default Hero