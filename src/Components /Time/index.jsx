import { useParams } from 'react-router-dom'

export default function ChooseTime() {

    const { movieID } = useParams();

    return <h1>ChooseTime</h1>
}