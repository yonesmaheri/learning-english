import Link from "next/link";

export default function NavLogo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        Y
      </div>
      <span className="text-lg font-black text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">
        یونس ماهری
      </span>
    </Link>
  );
}
