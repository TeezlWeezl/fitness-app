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
          "flex min-h-[214px] flex-col items-center justify-center rounded-[30px] p-7 text-center " +
          props.color
        }
      >
        <h2 className="headline-2">{props.children}</h2>
      </div>
    );
  } else {
    return (
      <div
        className={`mt-5 flex min-h-[${props.height}] flex-col items-center justify-center rounded-[30px] bg-app-medium first-of-type:mt-12 ${props.color} ${props.style}`}
      >
        {props.children}
      </div>
    );
  }
}
