import { supabase } from "../lib/supabase"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

type Drill = {
    id: string;
    distances: number[];
    reps: number;
    wind?: boolean;
}


export default function Drill(){
    const { id } = useParams();
    const [drill, setDrill] = useState<Drill | null>(null);
    const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
    const [error, setError] = useState("")

    useEffect(() => {
        if (!id) {return;}
        supabase
            .from("drills")
            .select("*")
            .eq("id", id)
            .single()
            .then(({ data, error }) => {
                if (error) setError(error.message);
                else {
                    setDrill(data);
                    setSelectedDistance(data.distances[0]);
                } 
            });
    }, [id]) 

    if (error) return <p className="p-6 text-red-500">{error}</p>
    if (!drill) return <p className="p-6">Loading drill...</p>

    return(
        <div className="p-6 space-y-6 max-w-lg mx-auto flex flex-col justify-center items-center">
            <div>
                <h1 className="text-3xl font-bold">Drill</h1>
            </div>

            <div className="flex-col justify-center items-center space-y-4">
                <h1 className="text-2xl font-bold">Current Distance</h1>
                <h2 className="text-xl font-bold text-center">{selectedDistance} feet</h2>
                <h2 className="text-xl text-center">{circleHelper(selectedDistance)}</h2>
            </div>

            <div className="flex gap-4 justify-center mt-6">
                <button
                    onClick={() => handlePutt("hit")}
                    className="bg-green-600 text-white text-xl px-6 py-3 rounded"
                >
                    HIT
                </button>
                <button
                    onClick={() => handlePutt("miss")}
                    className="bg-red-600 text-white text-xl px-6 py-3 rounded"
                >
                    MISS
                </button>
            </div>


        </div>
    )

    async function handlePutt(result: "hit" | "miss") {
        if (!selectedDistance) return;

        const { error } = await supabase.from("putts").insert({
            drill_id: id,
            result,
        });

        if (error) {
            console.error("Failed to log putt: ", error.message);
            setError(error.message);
        }
    }
    
} 
function circleHelper(ft: number | null): string {
    if (!ft) return "";
    if (ft > 0 && ft <= 33){
        return "Circle 1X";
    }else if (ft > 33 && ft <= 66){
        return "Circle 2X";
    }else {
        return "Throw in";
    }
}
