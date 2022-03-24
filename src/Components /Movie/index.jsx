
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './movie.css'

export default function ChooseMovie() {

    const [movies, setMovies] = useState([])

    useEffect(() => { GetMoviesFromAPI(setMovies) }, [])

    return movies !== null ? <RenderMovies movies={movies} /> : <h1>Loading</h1>
}

function GetMoviesFromAPI(setMovies) {

    axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies')
        .then(({ data }) => {
            setMovies(data)
        })
        .catch(error => {
            console.log(error)
        })
}

function RenderMovies({ movies }) {
    
    return (
        <section className="choose-movies ">
            <header><h1>CINEFLEX</h1></header>
            <div className="title"><h1>Selecione o filme</h1></div>
            <div className="movies-container">
                <div className="movies-contents">
                    {generateMovies(movies)}
                </div>
            </div>
        </section>
    )
}

function generateMovies(movies) {

    return (
        movies.map((movie, index) =>
            <div className="box-movie" key={index}>
                <Link to={`/movie/${movie.id}`}>
                    <img src={movie.posterURL} key={index} alt='' />
                </Link>
            </div>)
    )
}