import CourseCard from "@/shared/components/courseCard";
import React from "react";

const courses = [
  {
    title: "آموزش جامع Next.js از مقدماتی تا پیشرفته",
    instructor: "علی رضایی",
    thumbnail: "/images/course-1.jpg",
    href: "/courses/nextjs",
  },
  {
    title: "آموزش Tailwind CSS برای پروژه‌های مدرن",
    instructor: "محمد احمدی",
    thumbnail: "/images/course-2.jpg",
    href: "/courses/tailwind",
  },
  {
    title: "آموزش TypeScript کاربردی برای React",
    instructor: "سارا محمدی",
    thumbnail: "/images/course-3.jpg",
    href: "/courses/typescript",
  },
];

function Favorites() {
  return (
    <div dir="rtl" className="mt-10">
      <h2 className="font-bold text-xl lg:text-2xl">دوره های محبوب</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {courses.map((course) => (
          <CourseCard key={course.href} {...course} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
