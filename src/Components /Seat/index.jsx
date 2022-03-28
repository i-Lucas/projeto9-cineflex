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

    const [list, setList] = useState([])

    return (

        <section className="choose-seat">
            <Header />
            <div className="container">
                <div className="title"><h1>Selecione o(s) assento(s)</h1></div>
                <div className="seats">
                    <RenderSeats seats={movieData.seats} setList={setList} list={list} />
                </div>
                <div className="description">
                    <div className="selected"><div className="seat-selected"></div><h1>Selecionado</h1></div>
                    <div className="available"><div className="seat-available"></div><h1>Disponível</h1></div>
                    <div className="unavailable"><div className="seat-unavailable"></div><h1>Indisponível</h1></div>
                </div>
                <RenderInputs />
            </div>
            <Footer img={img} title={title} weekday={weekday} date={date} />
        </section>
    )
}

function RenderSeats({ seats, setList, list }) {

    return seats.map((seat, index) =>
        <RenderThisSeat number={seat.name} available={seat.isAvailable} setList={setList} list={list} key={index} />
    )
}

function RenderThisSeat({ number, available, list, setList }) {

    const [seatInfo, setInfo] = useState({ selected: false })

    function checkSeat(number) {

        if (!seatInfo.selected) {
            setInfo({ selected: true })
            setList([...list, number])
        } else {
            setInfo({ selected: false })
            setList(list.filter(item => item !== number))
        }
    }

    return <div className={seatInfo.selected ? 'seat green' : available ? 'seat gray' : 'seat yellow'}
        onClick={() => available ? checkSeat(number) : alert(`seat ${number} is not available`)} ><h1>{number}</h1></div>
}

function RenderInputs() {

    const [inputs, setInputs] = useState({ nome: '', cpf: '', validate: false })

    function handleSubmit(e) {

        e.preventDefault()

        if (inputs.nome.length < 10) { return alert('NOME inválido') }
        if (inputs.cpf.length < 11) { return alert('CPF inválido') }
        else { setInputs({ ...inputs, validate: true }) }
    }

    return (
        <div className="inputs-container">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome do comprador" required
                    onChange={e => setInputs({ ...inputs, nome: e.target.value })} />

                <input type="text" placeholder="CPF" required
                    onChange={e => setInputs({ ...inputs, cpf: e.target.value })} />

                {inputs.validate ?
                    <Link style={{ textDecoration: 'none' }} state={inputs} to={`/success/`}>
                        <button type="submit">CONFIRMAR ?</button></Link> :
                    <button type="submit">Reservar assento(s)</button>}
            </form>
        </div>
    )
}