"use client";
import { useCourses } from "@/shared/api/services/courses";
import CourseCard from "@/shared/components/courseCard";
import Skeleton from "@/shared/components/skeleton";
import { Course } from "@/shared/types/courses";

function Courses() {
  const { isPending, isSuccess, data } = useCourses();

  return (
    <div dir="rtl">
      <h1 className="text-base lg:text-2xl font-black my-5">دوره ها</h1>
      {isPending ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Skeleton className="h-100 max-full" />
          <Skeleton className="h-100 max-full" />
          <Skeleton className="h-100 max-full" />
          <Skeleton className="h-100 max-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {data.map((item: Course) => {
            return <CourseCard key={item.id} course={item} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Courses;
