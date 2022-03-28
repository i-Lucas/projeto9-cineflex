import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Header from '../Header/'
import Footer from '../Footer/'
import './seat.css'

export default function ChooseSeat() {

    const { sessionID } = useParams()

    const [movieData, setData] = useState({

        movie: [],
        seats: [],
        days: []
    })

    useEffect(() => {

        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`)

            .then(({ data }) => setData({ movie: data.movie, seats: data.seats, days: data.day }))
            .catch(error => console.log(error))

    }, [sessionID])

    const { title, posterURL: img } = movieData.movie
    const { weekday, date } = movieData.days
    return (

        <section className="choose-seat">
            <Header />
            <div className="container">
                <div className="title"><h1>Selecione o(s) assento(s)</h1></div>
                <div className="seats">
                    <RenderSeats seats={movieData.seats} />
                </div>
                <div className="description">
                    <div className="selected"><div className="seat-selected"></div><h1>Selecionado</h1></div>
                    <div className="available"><div className="seat-available"></div><h1>Disponível</h1></div>
                    <div className="unavailable"><div className="seat-unavailable"></div><h1>Indisponível</h1></div>
                </div>
            </div>
            <Footer img={img} title={title} weekday={weekday} date={date} />
        </section>
    )
}

function RenderSeats({ seats }) {

    return seats.map((seat, index) =>
        <RenderThisSeat number={seat.name} available={seat.isAvailable} key={index} />
    )
}

function RenderThisSeat({ number, available }) {

    const [seatInfo, setInfo] = useState({
        selected: false,
        list: []
    })

    function checkSeat(number) {

        if (!seatInfo.selected) {
            setInfo({ selected: true, list: [...seatInfo.list, number] })
        } else {
            setInfo({ selected: false, list: seatInfo.list.filter(item => item !== number) })
        }
    }

    return <div className={seatInfo.selected ? 'seat green' : available ? 'seat gray' : 'seat yellow'}
        onClick={() => available ? checkSeat(number) : alert(`seat ${number} is not available`)} ><h1>{number}</h1></div>
}