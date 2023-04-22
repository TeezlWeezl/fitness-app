import { useCharacters } from "../hooks/useCharacters";
import "./CharacterOverview.style.css";

export function CharacterOverview() {
  const { error, data, loading } = useCharacters();

  if (loading) return <div>SPINNER...</div>;
  if (error) return <div>Error...</div>;

  return (
    <div className="CharacterOverview">
      {data.characters.results.map((c) => (
        <div key={c.image}>
          <h1 className="text-white bg-blue-600">{c.name}</h1>
          <img src={c.image}></img>
        </div>
      ))}
    </div>
  );
}
