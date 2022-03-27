import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Header from '../Header/'
import Footer from '../Footer/'
import './time.css'

export default function ChooseTime() {

    const { movieID } = useParams();

    const [movie, setMovie] = useState([]);
    const [times, setTimes] = useState([]);

    useEffect(() => {

        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieID}/showtimes`)

            .then(({ data }) => {
                setTimes(data.days)
                setMovie(data)
            })
            .catch(error => {
                console.log(error)
            })

    }, [movieID])

    function renderShowtimes(time) {
        return (
            time.map(({ name, id }, index) =>
                <div className="available-time" key={index}>
                    <div className="time-box">
                        <Link style={{ textDecoration: 'none' }} to={`/seats/${id}`}>
                            <h1>{name}</h1>
                        </Link>
                    </div>
                </div>
            )
        )
    }

    function renderWeekDays(times) {
        return (
            times.map((time, index) =>
                <div className="container" key={index}>
                    <div className="date">
                        <h1>{time.weekday} - {time.date}</h1>
                    </div>
                    {renderShowtimes(time.showtimes)}
                </div>
            )
        )
    }

    return (
        <section className='choose-section-time'>
            <Header />
            <div className="title"><h1>Selecione o horário</h1></div>
            <div className="contents">
                {renderWeekDays(times)}
            </div>
            <Footer img={movie.posterURL} title={movie.title} />
        </section>
    )
}