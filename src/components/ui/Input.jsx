const Input = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
      w-full
      p-4
      rounded-xl
      bg-white/5
      border
      border-white/10
      outline-none
      focus:border-blue-500
      "
    />
  );
};

export default Input;