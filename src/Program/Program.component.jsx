function Program(props) {
  return (
    <div className="app-default pl-0 pr-0 pt-0">
      <div className="redGradient relative flex min-h-[75vh] flex-col justify-center">
        <h1 className="headline-1 pl-9 pr-9 text-center">Titel des Programs</h1>
        <div className="absolute bottom-4 flex min-w-full justify-between pl-9 pr-9">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="min-h-[25px] min-w-[25px] max-w-[25px] rounded-full bg-app-medium"></div>
            <p className="stext">Kraft</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="min-h-[25px] min-w-[25px] max-w-[25px] rounded-full bg-app-medium"></div>
            <p className="stext">Leicht</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="min-h-[25px] min-w-[25px] max-w-[25px] rounded-full bg-app-medium"></div>
            <p className="stext">6 Wochen</p>
          </div>
        </div>
      </div>
      <div className="bg-app-medium px-6 py-5 ">
        <p className="mtext">Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und Konsonantien leben die Blindtexte. Abgeschieden wohnen sie in Buchstabhausen an der Küste des Semantik, eines großen Sprachozeans. Ein kleines Bächlein namens Duden fließt durch ihren Ort und versorgt sie mit den nötigen Regelialien. Es ist ein paradiesmatisches Land, in dem einem gebratene Satzteile in den Mund fliegen.</p>
      </div>
      <div className="px-6 py-7">
        <h3 className="headline-3">So ist das Programm aufgeteilt:</h3>
      </div>
    </div>
  );
}

export { Program };
