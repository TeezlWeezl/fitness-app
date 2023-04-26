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
        {data.programs?.map(({ id, name, style }, index) => {
          // In order to check if gradient-<1, 2, 3> to apply the following calculation is used
          // (index + 1) / 3 --> returns x.3333 for first, x.6666 for second, x.0000 for third
          // result % 1 to only return the digits after the .
          // result.toFixed(1) returns a string being either '0.0' for third, '0.7' for second, '0.3 for first
          if ((((index + 1) / 3) % 1).toFixed(1) === "0.0") {
            return (
              <Link
                key={id}
                className="mt-5 block first-of-type:mt-10"
                to={`/programs/${id}`}
              >
                <ActionCard key={id} type="program" color={style}>
                  {name}
                </ActionCard>
              </Link>
            );
          } else if ((((index + 1) / 3) % 1).toFixed(1) === "0.7") {
            return (
              <Link
                key={id}
                className="mt-5 block first-of-type:mt-10"
                to={`/programs/${id}`}
              >
                <ActionCard key={id} type="program" color="gradient-2">
                  {name}
                </ActionCard>
              </Link>
            );
          } else {
            return (
              <Link
                key={id}
                className="mt-5 block first-of-type:mt-10"
                to={`/programs/${id}`}
              >
                <ActionCard key={id} type="program" color="gradient-1">
                  {name}
                </ActionCard>
              </Link>
            );
          }
        })}

        <Navbar nav="programs" />
      </div>
    );
}

export { ProgramBrowser };
