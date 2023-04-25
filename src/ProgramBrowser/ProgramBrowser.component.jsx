import { ActionCard } from "../ActionCard";
import { Navbar } from "../Navbar";
import { usePrograms } from "../hooks/usePrograms";

function ProgramBrowser() {
  const { error, data, loading } = usePrograms()

  console.log({error, data, loading});

  if (loading) return (
    <div className="min-h-screen bg-app-dark px-4 py-10 pb-16">
      <h2 className="headline-2">Browse</h2>
      <p className="mtext">Loading...</p>
      <Navbar nav="programs" />
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-app-dark px-4 py-10 pb-16">
      <h2 className="headline-2">Browse</h2>
      <p className="mtext">Es ist ein Fehler aufgetreten</p>
      <p className="stext">{error}</p>
      <Navbar nav="programs" />
    </div>
  )

  return (
    <div className="min-h-screen bg-app-dark px-4 py-10 pb-16">
      <h2 className="headline-2">Browse</h2>
      <ActionCard type="program" color="gradient-1" height="214px">TestCard</ActionCard>
      <ActionCard type="program" color="gradient-2" height="214px" />
      <ActionCard type="program" color="gradient-3" height="214px" />
      <ActionCard type="program" color="gradient-1" height="214px" />
      <ActionCard type="program" color="gradient-2" height="214px" />
      <ActionCard type="program" color="gradient-3" height="214px" />

      <Navbar nav="programs" />
    </div>
  );
}

export { ProgramBrowser };
