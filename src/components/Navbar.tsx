import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex items-center gap-4 p-4 bg-neutral-900 text-white">
            <Link to="/" className="font-semibold">Home</Link>
            <Link to="/drill/new">New Drill</Link>
            <Link to="/history">History</Link>
        </nav>
    );
}