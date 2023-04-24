import { ActionCard } from "../ActionCard";
import { Navbar } from "../Navbar";

function ProgramBrowser() {
  return (
    <div className="min-h-screen bg-app-dark px-4 py-10 pb-16">
      <h2 className="headline-2">Browse</h2>
      <ActionCard type="program" color="gradient-1" height="214px" />
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
