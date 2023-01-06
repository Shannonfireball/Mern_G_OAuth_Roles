import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <section className="missing">
            <h1>Page Not Found</h1>
            <div className="flexGrow">
                <Link to="/">Visit Our Homepage</Link>
            </div>
        </section>
    )
}

export default Missing