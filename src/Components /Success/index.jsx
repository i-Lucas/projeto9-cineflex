import { useLocation, Link } from 'react-router-dom'

import Header from '../Header/'
import './success.css'

export default function Success() {

    let data = useLocation()
    const info = data.state

    return (
        <section className="success">

            <Header />
            
            <div className="success-text">
                <h1>Pedido feito com sucesso!</h1>
            </div>

            <div className="success-container">
                <h1>Filme e sessão</h1>
                <h2>{info.title}</h2>
                <h2>{info.date} {info.time}</h2>

                <h1>Ingressos</h1>
                <RenderSeats seats={info.seats} />

                <h1>Comprador</h1>
                <h2>Nome: {info.nome}</h2>
                <h2>CPF: {info.cpf}</h2>

                <Link style={{ textDecoration: 'none' }} to="/">
                    <div className="btn-back">
                        <button>Voltar pra Home</button>
                    </div>
                </Link>
            </div>
        </section>
    )
}

function RenderSeats({ seats }) {

    return seats.map((seat, index) =>
        <h2 key={index}>Assento {seat}</h2>
    )
}