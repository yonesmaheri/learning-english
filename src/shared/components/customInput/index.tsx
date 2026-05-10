type CustomInputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function CustomInput({
  label,
  type = "text",
  placeholder,
  error,
  ...props
}: CustomInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:ring-4 ${
          error
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
        }`}
        {...props}
      />

      {error && (
        <p className="text-sm font-medium text-red-500 animate-in fade-in duration-300">
          {error}
        </p>
      )}
    </div>
  );
}
