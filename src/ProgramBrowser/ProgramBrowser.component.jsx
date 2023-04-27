import { ActionCard } from "../ActionCard";
import { Navbar } from "../Navbar";
import { usePrograms } from "../hooks/usePrograms";
import { Link } from "react-router-dom";

function ProgramBrowser() {
  const { error, data, loading } = usePrograms();

  if (loading)
    return (
      <div className="min-h-screen bg-app-dark px-4 py-10 pb-16">
        <h2 className="headline-2">Browse</h2>
        <p className="mtext">Loading...</p>

        <Navbar nav="programs" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-app-dark px-4 py-10 pb-16">
        <h2 className="headline-2">Browse</h2>
        <p className="mtext">Es ist ein Fehler aufgetreten</p>
        <p className="stext">{error}</p>

        <Navbar nav="programs" />
      </div>
    );
  if (data)
    return (
      <div className="min-h-screen bg-app-dark px-4 py-10 pb-16">
        <h2 className="headline-2">Browse</h2>
        {data.programs?.map(({ id, name, color }, index) => {
          return (
            <Link
              key={id}
              className="mt-5 block first-of-type:mt-10"
              to={`/programs/${id}`}
            >
              <ActionCard key={id} type="program" color={color}>
                {name}
              </ActionCard>
            </Link>
          );
        })}

        <Navbar nav="programs" />
      </div>
    );
}

export { ProgramBrowser };
