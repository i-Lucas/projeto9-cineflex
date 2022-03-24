
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import './movie.css'

export default function ChooseMovie() {

    const { movieID } = useParams();
    console.log('movieID: ', movieID)

    const [movies, setMovies] = useState([])

    useEffect(() => {

        const promise = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies')
        promise.then(({ data }) => {
            setMovies(data)
        })
        promise.catch(error => {
            console.log(error)
        })

    }, [])

    function selectMovie(movieID) {
        return console.log(`Você selecionou o filme ${movieID}`)
    }

    const generateMovies = () => movies.map((movie, index) =>
        <div className="box-movie" key={index} onClick={() => selectMovie(movie.id)}>
            <img src={movie.posterURL} key={index} alt=''>
            </img>
        </div>)

    return (

        <section className="choose-movies ">
            <header><h1>CINEFLEX</h1></header>
            <div className="title"><h1>Selecione o filme</h1></div>
            <div className="movies-container">
                <div className="movies-contents">
                    {generateMovies()}
                </div>
            </div>
        </section>
    )
}