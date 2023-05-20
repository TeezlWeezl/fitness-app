function ActionButton({ onClick, children, color, className }) {
  return (
    <a
      className={`mtext fixed bottom-6 left-[50%] max-h-[45px] min-h-[45px] max-w-fit translate-x-[-50%] rounded-[50px] px-6 py-3 text-app-dark ${color} ${className}`}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export { ActionButton };
