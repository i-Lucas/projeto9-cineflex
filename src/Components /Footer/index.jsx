import './footer.css'

export default function Footer({ img, title, weekday, date }) {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="img-container">
                    <img src={img} alt="" />
                </div>
                <div className="movie-title">
                    <h1>{title}</h1>
                    <h1>{weekday}</h1>
                    <h1>{date}</h1>
                </div>
            </div>
        </div>
    )
}