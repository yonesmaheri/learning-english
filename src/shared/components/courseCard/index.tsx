import Image from "next/image";
import Link from "next/link";

type CourseCardProps = {
  title: string;
  instructor: string;
  thumbnail: string;
  href?: string;
};

export default function CourseCard({
  title,
  instructor,
  thumbnail,
  href = "/courses",
}: CourseCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100">
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-80" />
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-lg font-extrabold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">
            {title}
          </h3>

          <p className="text-sm text-gray-500">
            مدرس:{" "}
            <span className="font-medium text-gray-700">{instructor}</span>
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200"
          >
            ثبت‌نام
          </Link>

          <span className="text-xs text-gray-400 transition-all duration-300 group-hover:text-indigo-500">
            مشاهده جزئیات
          </span>
        </div>
      </div>
    </div>
  );
}
