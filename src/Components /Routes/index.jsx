import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Movie from '../Movie'
import Time from '../Time'
import Seat from '../Seat'
import Success from '../Success'

export default function RenderizarRotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Movie />} />
                <Route path='/time' element={<Time />} />
                <Route path='/seat' element={<Seat />} />
                <Route path='/success' element={<Success />} />
            </Routes>
        </BrowserRouter>
    )
}