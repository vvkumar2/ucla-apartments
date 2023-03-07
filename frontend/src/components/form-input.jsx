export default function FormInput({ placeholder, value, onChange, password = false }) {
  return (
    <input
      className="h-[50px] w-full rounded-md border border-gray-200 px-5 placeholder-gray-400"
      type={`${password ? 'password' : 'text'}`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
