import { supabase } from "../lib/supabase";

export default function LogoutButton(){
    const handle = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error("Signout failed. ", error.message);
    };

    return (
        <button onClick={handle} className="ml-auto bg-red-600 text-white px-3 py-1 rounded transition-transform duration-200 transform hover:scale-105 hover:bg-red-400 cursor-pointer">
            Sign Out
        </button>
    )
}