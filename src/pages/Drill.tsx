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
    const [repNumber, setRepNumber] = useState(0);
    const [distanceIndex, setDistanceIndex] = useState(0);

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
                    setDistanceIndex(0);
                    setRepNumber(0);
                } 
            });
    }, [id]) 

    useEffect(() => {
        if (drill) {
            setSelectedDistance(drill.distances[distanceIndex]);
        }
    }, [drill, distanceIndex])

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

            <h2 className="text-lg text-center">
                Rep {repNumber + 1} of {drill.reps}
            </h2>


        </div>
    )

    async function handlePutt(result: "hit" | "miss") {
        if (!selectedDistance || !drill) return;

        const { error } = await supabase.from("putts").insert({
            drill_id: id,
            result,
            distance: selectedDistance,
        });

        if (error) {
            console.error("Failed to log putt: ", error.message);
            setError(error.message);
            return;
        }

        const nextRepNumber = repNumber + 1;

        if (nextRepNumber >= drill.reps){
            if (distanceIndex + 1 < drill.distances.length){
                setDistanceIndex(distanceIndex + 1);
                setRepNumber(0);
            }else {
                alert("Drill complete!")
            }
        } else{
            setRepNumber(nextRepNumber)
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
