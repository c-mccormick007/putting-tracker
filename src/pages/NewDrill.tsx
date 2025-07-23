import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function NewDrill() {
  const [distances, setDistances] = useState<number[]>([15]);
  const [wind, setWind] = useState(false);
  const [windType, setWindType] = useState({ direction: "", intensity: "" });
  const [error, setError] = useState("");
  const [reps, setReps] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      setError("Not logged in.");
      return;
    }

    const { data, error } = await supabase
      .from("drills")
      .insert({
        user_id: user.id,
        distances: distances,
        wind: wind,
        wind_type: windType,
        reps: reps,
      })
      .select()
      .single();

    if (error) {
      setError(error.message);
      return;
    }

    navigate(`/drill/${data.id}`);
  };

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
              onChange={(e) => {
                const copy = [...distances];
                copy[i] = Number(e.target.value);
                setDistances(copy);
              }}
              className="flex-1 border p-2 rounded no-spinner"
              onFocus={(e) => e.target.select()}
            />
            <button
              onClick={() => {
                setDistances(distances.filter((_, del) => del !== i));
              }}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={() => setDistances([...distances, 0])}
          className="mt-2 text-blue-600 border rounded p-2"
        >
          + Add Distance
        </button>
        <label className="block mb-2 mt-3 font-medum">Log wind?</label>
        <input
          type="checkbox"
          name="wind"
          onChange={() => {
            setWind(!wind);
            if (!wind) {
              setWindType({ direction: "", intensity: "" });
            }
          }}
        />
        {wind ? (
          <>
            <label className="block mb-2 mt-3 font-medium">
              Wind Speed/Intensity?
            </label>
            <div className="flex max-w-md">
              <div>
                {["Headwind", "Left to Right", "Right to Left", "Tailwind"].map(
                  (dir) => (
                    <label key={dir} className="mr-4 flex p-3">
                      <input
                        type="radio"
                        name="direction"
                        value={dir}
                        checked={windType.direction === dir}
                        onChange={(e) => {
                          setWindType((prev) => ({
                            ...prev,
                            direction: e.target.value,
                          }));
                        }}
                        className="mr-1"
                      />
                      {dir}
                    </label>
                  )
                )}
              </div>
              <div>
                {["Calm", "Moderate", "Intense"].map((i) => (
                  <label key={i} className="mr-4 flex p-3">
                    <input
                      type="radio"
                      name="intensity"
                      value={i}
                      checked={windType.intensity === i}
                      onChange={(e) => {
                        setWindType((prev) => ({
                          ...prev,
                          intensity: e.target.value,
                        }));
                      }}
                      className="mr-1"
                    />
                    {i}
                  </label>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex">
        <label className="pr-1">Reps per Distance:</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(Number(e.target.value))}
          className="flex-1 border p-2 rounded no-spinner"
          onFocus={(e) => e.target.select()}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Start Drill
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
