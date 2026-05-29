"use client";

import { useAuthStore } from "@/shared/store/auth";
import { useState } from "react";
import Modal from "../modal";
import CourseDetailsModal from "./components/courseDetailsModal";
import { Course } from "@/shared/types/courses";
import RegisterCourseModal from "./components/registerCourseModal";

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  const is_loggedin = useAuthStore((state) => state.is_loggedin);
  const is_tutor = useAuthStore((state) => state.is_tutor);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleRegisterClick = () => {
    if (is_loggedin) {
      setShowConfirmModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100">
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-80" />
        </div>

        <div className="space-y-4 p-5">
          <div className="space-y-2">
            <h3 className="line-clamp-2 text-lg font-extrabold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">
              {course.title}
            </h3>
          </div>

          <div className="flex items-center justify-between pt-2">
            {!is_tutor && (
              <button
                onClick={handleRegisterClick}
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200"
              >
                ثبت‌نام
              </button>
            )}

            <button
              onClick={() => setShowDetailsModal(true)}
              className="text-xs  text-gray-400 transition-all duration-300 group-hover:text-indigo-500 group-hover:border-indigo-500 border px-4 py-2.5 rounded-xl border-gray-400"
            >
              مشاهده جزئیات
            </button>
          </div>
        </div>
      </div>

      <RegisterCourseModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        courseId={course.id}
        price={course.price_per_toman}
      />

      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <div className="space-y-4 text-right">
          <h2 className="text-xl font-bold text-gray-900">نیاز به ورود</h2>
          <p className="text-sm text-gray-600">
            برای ثبت‌نام در این دوره ابتدا باید لاگین کنید.
          </p>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setShowLoginModal(false)}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all"
            >
              بستن
            </button>

            <a
              href="/login"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-all"
            >
              رفتن به صفحه لاگین
            </a>
          </div>
        </div>
      </Modal>

      <CourseDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        course={course}
      />
    </>
  );
}
