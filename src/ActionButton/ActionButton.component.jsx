function ActionButton(props) {
  return (
    <button
      className={`mtext fixed bottom-6 left-[50%] min-h-[45px] max-w-fit translate-x-[-50%] rounded-[50px] px-6 py-3 text-app-dark ${props.color}`}
    >
      {props.children}
    </button>
  );
}

export { ActionButton };
