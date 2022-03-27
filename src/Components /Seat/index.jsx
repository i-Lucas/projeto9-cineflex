import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Header from '../Header/'
import Footer from '../Footer/'
import './seat.css'

export default function ChooseSeat () {

    const { sessionID } = useParams()
    const [seats, setSeats] = useState([])
    const [movieData, setMovieData] = useState([])
    const [movieDay, setMovieDay] = useState([])

    useEffect(() => {

        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`)

            .then(({ data }) => {

                setMovieData(data.movie)
                setMovieDay(data.day)
                setSeats(data.seats)
            })
            .catch(error => {
                console.log(error)
            })

    }, [sessionID])

    return (
        <section className="choose-seat">
            <Header />
            <div className="container">
                <div className="title"><h1>Selecione o(s) assento(s)</h1></div>
                <div className="seats">
                    {renderSeats(seats)}
                </div>
                <div className="description">
                    <div className="selected"><div className="seat-selected"></div><h1>Selecionado</h1></div>
                    <div className="available"><div className="seat-available"></div><h1>Disponível</h1></div>
                    <div className="unavailable"><div className="seat-unavailable"></div><h1>Indisponível</h1></div>
                </div>
            </div>
            <Footer img={movieData.posterURL} title={movieData.title} weekday={movieDay.weekday} date = {movieDay.date}/>
        </section>
    )
}

function renderSeats(seats) {  

    return (
        seats.map((seat, index) => {
            return <div className="seat" key={index}><h1>{seat.name}</h1></div>
        })
    )
}