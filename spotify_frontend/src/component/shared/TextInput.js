const TextInput = ({ label, placeholder, className, value, setValue, labelClassName, read }) => {
  return (
    <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
      <label for={label} className={`font-semibold ${labelClassName}`}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className={`${read?"text-gray-500":"text-black"} p-3 border border-gray-400  border-solid rounded placeholder-gray-500`}
        id={label}
        readOnly={read}
        value={value}
        onChange={(event)=>{
          setValue(event.target.value);
        }}
      />
    </div>
  );
};

export default TextInput;
