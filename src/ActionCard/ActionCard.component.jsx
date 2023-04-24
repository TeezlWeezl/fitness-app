export function ActionCard(props) {
  if (props.type === "dashboard") {
    return (
      <div className="flex min-h-[214px] flex-col justify-end rounded-[30px] bg-app-medium p-7">
        <h3 className="headline-3">Tag 2</h3>
        <h2 className="headline-2">Titel des Programms</h2>
        <p className="stext">26 Min. · Beweglichkeit </p>
      </div>
    );
  } else if (props.type === "program") {
    return (
      <div
        className={
          "mt-5 flex min-h-[214px] flex-col items-center justify-center rounded-[30px] bg-app-medium p-7 first-of-type:mt-12 " +
          props.color
        }
      >
        <h2 className="headline-2">Titel des Programms</h2>
      </div>
    );
  } else {
    throw Error("Card type not specified.");
  }
}
