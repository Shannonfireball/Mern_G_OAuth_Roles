
import { Link } from "react-router-dom"

const Lounge = () => {
    return (
        <section className="lounge">
            <h1>The Lounge</h1>
            <br />
            <p>Admins and Editors can hang out here.</p>
            <div className="flexGrow">
                <Link to="/welcome">Welcome</Link>
            </div>
        </section>
    )
}

export default Lounge