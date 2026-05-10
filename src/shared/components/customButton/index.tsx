type CustomButtonProps = {
  label: string;
  loading?: boolean;
};

export default function CustomButton({
  label,
  loading = false,
}: CustomButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? "در حال پردازش..." : label}
    </button>
  );
}
