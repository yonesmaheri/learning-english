import CourseCard from "@/shared/components/courseCard";
import { Course } from "@/shared/types/courses";
import Link from "next/link";

function Favorites({ data }: { data: Course[] }) {
  return (
    <div dir="rtl" className="mt-10">
      <div className="w-full flex items-center justify-between  mt-10">
        <h2 className="font-bold text-xl lg:text-2xl">دوره های محبوب</h2>
        <Link
          href={`/courses`}
          className="text-xs  text-gray-400 transition-all duration-300 group-hover:text-indigo-500 group-hover:border-indigo-500 border px-4 py-2.5 rounded-xl border-gray-400"
        >
          همه دوره ها
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {data.map((course: Course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
