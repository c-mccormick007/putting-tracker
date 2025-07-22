import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
    return (
        <nav className="flex items-center gap-6 p-4 bg-neutral-900 text-white">
            <Link to="/" className="font-semibold transition-colors duration-200 hover:text-gray-300">Home</Link>
            <Link to="/drill/new" className="font-semibold transition-colors duration-200 hover:text-gray-300">New Drill</Link>
            <Link to="/history" className="font-semibold transition-colors duration-200 hover:text-gray-300">History</Link>
            <LogoutButton />
        </nav>
    );
}