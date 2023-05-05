import { ActionCard } from "../ActionCard";
import { Navbar } from "../Navbar";

const UserProfile = () => {
  return (
    <div className="app-default">
      <h2 className="headline-2">Name</h2>
      <div className=" mt-[85px] flex flex-col items-center justify-center gap-3">
        <div className="blueGradient min-h-[120px] min-w-[120px] rounded-full"></div>
        <p className="mtext">Profil bearbeiten</p>
      </div>
      <p className="mtext mt-9">Aktueller Trainingsplan</p>
      <ActionCard
        height="120px"
        color="bg-app-medium"
        type="custom"
        style="mt-2 pl-6"
      >
        <div className="flex items-center justify-start min-w-full gap-8 ml">
          <div className="min-h-[62px] min-w-[62px] rounded-full bg-green-600"></div>
          <div className="flex flex-col gap-0">
            <p className="mtext">Titel des Programms</p>
            <p className="stext">1 von 8 geschafft</p>
          </div>
        </div>
      </ActionCard>

      <Navbar nav="profile" />
    </div>
  );
};

export { UserProfile };
