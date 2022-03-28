import { useLocation } from 'react-router-dom'

export default function Success () {

    let data = useLocation()
    console.log(data.state)
    return(
        <h1>Sucess</h1>
    )
}   