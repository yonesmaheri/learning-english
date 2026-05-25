"use client";

import { useMe } from "@/shared/api/services/auth";
import { useTutorCourses } from "@/shared/api/services/courses";
import Skeleton from "@/shared/components/skeleton";
import Link from "next/link";
import { useState } from "react";
import CourseDetailsModal from "@/shared/components/courseCard/components/courseDetailsModal";
import { Course } from "@/shared/types/courses";

export default function TutorCourses() {
  const { data: meData, isPending: mePending } = useMe();
  const { data: courses, isPending: coursesPending } = useTutorCourses();

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isPending = mePending || coursesPending;

  return (
    <div dir="rtl" className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-800">دوره‌های من</h1>
        <Link
          href="/dashboard/tutor/create-course"
          className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200"
        >
          <span>ایجاد دوره جدید</span>
        </Link>
      </div>

      {isPending ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : courses?.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-20 text-center">
          <p className="text-lg font-bold text-slate-500">
            هنوز دوره‌ای ایجاد نکرده‌اید
          </p>
          <Link
            href="/dashboard/tutor/create-course"
            className="mt-4 text-indigo-600 font-bold hover:underline"
          >
            همین حالا اولین دوره خود را بسازید
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course: Course) => (
            <div
              key={course.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={course.image || "/placeholder-course.jpg"}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 rounded-xl bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-black text-indigo-600 shadow-sm">
                  {course.language}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="line-clamp-1 text-lg font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-slate-500 font-bold">
                  <span>{course.level}</span>
                  <span className="text-indigo-600">
                    {Number(course.price_per_toman).toLocaleString()} تومان
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setIsModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200"
                  >
                    مشاهده
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200">
                    ویرایش
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CourseDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={selectedCourse}
      />
    </div>
  );
}
