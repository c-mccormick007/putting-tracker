import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function NewDrill(){
    const [distances, setDistances] = useState<number[]>([15]);
    
    return (
        <div>
            <h1>Create a Drill</h1>
            <div>
                <label>Distances (feet)</label>
                {distances.map((dist, i) => (
                    <div key={i}>
                        <input 
                            type="number"
                            value={dist}
                            onChange={e => {
                                const copy = [...distances];
                                copy[i] = Number(e.target.value);
                                setDistances(copy);
                            }} 
                        />
                        <button onClick={() => {
                            setDistances(distances.filter((_, del) => del !== i))
                        }}>X</button>
                    </div>
                ))}
            <button
                onClick={() => setDistances([...distances, 0])}
            >+ Add Distance</button>
            </div>
        </div>
    )
}