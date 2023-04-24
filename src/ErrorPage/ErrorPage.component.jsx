import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col justify-center items-center min-h-screen gap-5">
      <h1 className="headline-2 text-black">Oops!</h1>
      <p className="mtext text-gray-400">Sorry, an unexpected error has occurred.</p>
      <p className="stext text-gray-400">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}