import Link from "next/link";

type NavActionsProps = {
  mobile?: boolean;
  data: any;
  isSuccess: boolean;
};

export default function NavActions({
  mobile = false,
  isSuccess,
  data,
}: NavActionsProps) {
  if (isSuccess) {
    return (
      <Link
        href={`/dashboard/${data.is_teacher ? "tutor" : "student"}`}
        className={`inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 ${
          mobile ? "w-full" : ""
        }`}
      >
        داشبورد
      </Link>
    );
  }

  return (
    <div className={`flex ${mobile ? "flex-col" : "items-center"} gap-3`}>
      <Link
        href="/login"
        className={`inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-600 hover:text-indigo-600 ${
          mobile ? "w-full" : ""
        }`}
      >
        ورود
      </Link>

      <Link
        href="/register"
        className={`inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 ${
          mobile ? "w-full" : ""
        }`}
      >
        ثبت‌نام
      </Link>
    </div>
  );
}
