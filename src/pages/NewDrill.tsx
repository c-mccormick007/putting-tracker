import { useState } from "react"
//import { useNavigate } from "react-router-dom"
//import { supabase } from "../lib/supabase"

export default function NewDrill(){
    const [distances, setDistances] = useState<number[]>([15]);
    //const [windType, setWindType] = useState({direction:"", intensity:""})
    
    return (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <h1 className="text-2xl font-bold text-center">Create a Drill</h1>
            <div>
                <label className="block mb-2 font-medium">Distances (feet)</label>
                {distances.map((dist, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                        <input 
                            type="number"
                            value={dist}
                            onChange={e => {
                                const copy = [...distances];
                                copy[i] = Number(e.target.value);
                                setDistances(copy);
                            }}
                            className="flex-1 border p-2 rounded" 
                        />
                        <button onClick={() => {
                            setDistances(distances.filter((_, del) => del !== i))
                        }} className="text-red-500">✕</button>
                    </div>
                ))}
            <button
                onClick={() => setDistances([...distances, 0])}
                className="mt-2 text-blue-600 border rounded p-2"
            >+ Add Distance</button>
            </div>
        </div>
    )
}