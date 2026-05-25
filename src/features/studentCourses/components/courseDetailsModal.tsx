"use client";

import Modal from "@/shared/components/modal";
import { Course } from "@/shared/types/courses";

type CourseDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
};

function renderTutorLanguages(languages: string[] | Record<string, string>) {
  if (Array.isArray(languages)) {
    return languages.map((lang, index) => (
      <span
        key={index}
        className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
      >
        {lang}
      </span>
    ));
  }

  return Object.entries(languages).map(([lang, level]) => (
    <span
      key={lang}
      className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
    >
      {lang} - {level}
    </span>
  ));
}

export default function CourseDetailsModal({
  isOpen,
  onClose,
  course,
}: CourseDetailsModalProps) {
  if (!course) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-h-[80vh] overflow-y-auto text-right" dir="rtl">
        <img
          src={"http://localhost:8000/" + course.image}
          alt={course.title}
          className="mb-4 h-52 w-full rounded-xl object-cover"
        />

        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              {course.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              کد دوره: {course.courseId}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-gray-50 p-3">
              <span className="font-bold text-gray-700">زبان:</span>{" "}
              {course.language}
            </div>
            <div className="rounded-xl bg-gray-50 p-3">
              <span className="font-bold text-gray-700">سطح:</span>{" "}
              {course.level}
            </div>
            <div className="rounded-xl bg-gray-50 p-3">
              <span className="font-bold text-gray-700">ظرفیت:</span>{" "}
              {course.capacity}
            </div>
            <div className="rounded-xl bg-gray-50 p-3">
              <span className="font-bold text-gray-700">دانشجوی فعال:</span>{" "}
              {course.active_students}
            </div>
            <div className="rounded-xl bg-gray-50 p-3">
              <span className="font-bold text-gray-700">مدت دوره:</span>{" "}
              {course.course_duration} دقیقه
            </div>
            <div className="rounded-xl bg-gray-50 p-3">
              <span className="font-bold text-gray-700">تعداد جلسات:</span>{" "}
              {course.length}
            </div>
            <div className="rounded-xl bg-gray-50 p-3">
              <span className="font-bold text-gray-700">ساعت شروع:</span>{" "}
              {course.schedule_start}
            </div>
            <div className="rounded-xl bg-gray-50 p-3">
              <span className="font-bold text-gray-700">ساعت پایان:</span>{" "}
              {course.schedule_end}
            </div>
          </div>

          <div>
            <h3 className="mb-1 text-lg font-bold text-gray-900">توضیحات</h3>
            <p className="text-sm leading-7 text-gray-600">
              {course.description}
            </p>
          </div>

          <div>
            <h3 className="mb-1 text-lg font-bold text-gray-900">
              جزئیات دوره
            </h3>
            <p className="text-sm leading-7 text-gray-600">{course.detail}</p>
          </div>

          <div>
            <h3 className="mb-1 text-lg font-bold text-gray-900">پیش‌نیازها</h3>
            <p className="text-sm leading-7 text-gray-600">
              {course.requirements}
            </p>
          </div>

          <div>
            <h3 className="mb-1 text-lg font-bold text-gray-900">
              منابع آموزشی
            </h3>
            <p className="text-sm leading-7 text-gray-600">
              {course.materials}
            </p>
          </div>

          <div>
            <h3 className="mb-1 text-lg font-bold text-gray-900">قیمت‌ها</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>هر ساعت: {course.price_per_hour}</p>
              <p>دلاری: {course.price_per_dollar} $</p>
              <p>تومانی: {course.price_per_toman} تومان</p>
            </div>
          </div>

          <div>
            <h3 className="mb-1 text-lg font-bold text-gray-900">
              زبان‌های مدرس
            </h3>
            <div className="flex flex-wrap gap-2">
              {renderTutorLanguages(course.tutor.languages_spoken)}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
