
import CourseCard from "@/shared/components/courseCard";
import { Course } from "@/shared/types/courses";

function Favorites({ data }: { data: Course[] }) {
  return (
    <div dir="rtl" className="mt-10">
      <h2 className="font-bold text-xl lg:text-2xl">دوره های محبوب</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {data.map((course: Course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
