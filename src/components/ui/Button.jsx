const Button = ({ children }) => {
  return (
    <button className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all font-semibold">
      {children}
    </button>
  );
};

export default Button;