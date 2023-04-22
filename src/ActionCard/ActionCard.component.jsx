export function ActionCard(props) {
  if (props.type === "dashboard") {
    return (
      <div className=" min-h-[214px] rounded-[30px] bg-app-medium p-7 flex flex-col justify-end">
        <h3 className="headline-3">Tag 2</h3>
        <h2 className="headline-2">Titel des Programms</h2>
        <p className="stext">26 Min. · Beweglichkeit </p>
      </div>
    );
  } else if (props.type === "programm") {
    // Action Card for Programm must be added    
    return <div></div>;
  } else {
    throw Error("Card type not specified.");
  }
}
