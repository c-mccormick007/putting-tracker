import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/drill/new">New Drill</Link>
            <Link to="/history">History</Link>
        </nav>
    );
}