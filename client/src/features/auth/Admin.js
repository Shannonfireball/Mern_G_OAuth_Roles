import { Link } from "react-router-dom"

const Admin = () => {
    return (
        <section className="admins">
            <h1>Admins Page</h1>
            <br />
            <p>You must have been assigned an Admin role.</p>
            <div className="flexGrow">
                <Link to="/welcome">Welcome</Link>
            </div>
        </section>
    )
}

export default Admin