
import { Link } from "react-router-dom"

const Editor = () => {
    return (
        <section className="editors">
            <h1>Editors Page</h1>
            <br />
            <p>You must have been assigned an Editor role.</p>
            <div className="flexGrow">
                <Link to="/welcome">Welcome</Link>
            </div>
        </section>
    )
}

export default Editor