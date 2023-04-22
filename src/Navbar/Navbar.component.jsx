import './Navbar.style.css'

export function Navbar(props) {
  return (
    <div className=" fixed bottom-0 left-0 flex min-w-full justify-between rounded-t-[20px] bg-black/40 px-10 py-[14px]">
      <img className={props.nav !== 'home' ? 'navicon-disabled' : ''} src="../icon/Navbar__home.svg"></img>
      <img className={props.nav !== 'program' ? 'navicon-disabled' : ''} src="../icon/Navbar__program.svg"></img>
      <img className={props.nav !== 'profile' ? 'navicon-disabled' : ''} src="../icon/Navbar__profile.svg"></img>
    </div>
  );
}
