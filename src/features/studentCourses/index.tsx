"use client";
import { useStudentDashboard } from "@/shared/api/services/student";
import CustomButton from "@/shared/components/customButton";
import Skeleton from "@/shared/components/skeleton";
import CourseDetailsModal from "./components/courseDetailsModal";
import { useState } from "react";
import Link from "next/link";

function StudentsCourses() {
  const { isPending, data, isError } = useStudentDashboard();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <h1 className="text-2xl font-black mb-10">دوره های من</h1>
      {isPending ? (
        <div className="flex flex-col gap-10">
          <Skeleton className="h-20 max-w-200" />
          <Skeleton className="h-20 max-w-200" />
          <Skeleton className="h-20 max-w-200" />
          <Skeleton className="h-20 max-w-200" />
        </div>
      ) : isError ? (
        <>اطلاعاتی برای نمایش وجود ندارد</>
      ) : (
        <div className="w-full flex flex-col">
          <h2>لیست دوره های تایید شده</h2>

          {data.approved_courses.length === 0 ? (
            <div className="mt-6 flex flex-col items-center justify-center py-10 rounded-xl shadow-lg border border-black/5 bg-white/60 text-center">
              <p className="text-gray-600 mb-2">
                دوره‌ های شما پس از ثبت نام ابتدا باید توسط ادمین تایید شوند
              </p>
              <p className="text-sm text-gray-500 mb-2">
                پس از تایید در دوره‌ ها، اطلاعات آن‌ ها در اینجا نمایش داده
                می‌شود
              </p>
            </div>
          ) : (
            <div className="w-full mt-5 grid lg:grid-cols-2 grid-cols-1 gap-5">
              {data.approved_courses.map((item: any) => {
                return (
                  <div className="p-3 rounded-2xl bg-gray-100 " key={item.id}>
                    <div className="w-full">
                      <div className="relative h-52 w-full overflow-hidden">
                        <img
                          src={"http://localhost:8000/" + item.image}
                          alt={item.title}
                          className="h-full w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p className="text-sm lg:text-base mb-3 font-black mt-3">
                        {item.title}
                      </p>
                      <p className="text-sm lg:text-base mb-3 leading-7 text-gray-500">
                        {item.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsOpen(true)}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      مشاهده جزئیات
                    </button>
                    <CourseDetailsModal
                      course={item}
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default StudentsCourses;
