"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import {
  useTutorDashboard,
  useAddTutorCourse,
  useDeleteTutorCourse,
} from "@/shared/api/services/tutor";
import CustomInput from "@/shared/components/customInput";
import Skeleton from "@/shared/components/skeleton";
import Modal from "@/shared/components/modal";

const tutorCourseSchema = z.object({
  course_title: z.string().min(1, "عنوان دوره الزامی است"),
  duration_minutes: z.number().min(1, "مدت زمان الزامی است"),
  course_type: z.enum(["online", "offline"]),
  price_per_hour: z.number().min(0, "قیمت الزامی است"),
  lesson_package: z.string().min(1, "پکیج درس الزامی است"),
  language: z.string().min(1, "زبان الزامی است"),
  start_date: z.string().min(1, "تاریخ شروع الزامی است"),
  description: z.string().min(1, "توضیحات الزامی است"),
});

type TutorCourseFormValues = z.infer<typeof tutorCourseSchema>;

export default function TutorProfileCourses() {
  const queryClient = useQueryClient();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isPending: tutorPending, data: tutorData } = useTutorDashboard();
  const { mutate: addCourse, isPending: addCoursePending } =
    useAddTutorCourse();
  const { mutate: deleteCourse } = useDeleteTutorCourse();

  const {
    register: registerCourse,
    handleSubmit: handleSubmitCourse,
    reset: resetCourse,
    formState: { errors: courseErrors },
  } = useForm<TutorCourseFormValues>({
    resolver: zodResolver(tutorCourseSchema),
    defaultValues: {
      course_title: "",
      duration_minutes: 0,
      course_type: "online",
      price_per_hour: 0,
      lesson_package: "",
      language: "",
      start_date: "",
      description: "",
    },
  });

  const onAddCourse = (values: TutorCourseFormValues) => {
    if (!tutorData?.tutor?.id) return;
    const payload = {
      ...values,
      tutor: tutorData.tutor.id,
    };
    addCourse(payload, {
      onSuccess() {
        toast.success("دوره آموزشی اضافه شد");
        resetCourse();
        queryClient.invalidateQueries({ queryKey: ["tutor-dashboard"] });
      },
    });
  };

  const onDeleteItem = (id: number) => {
    deleteCourse(id, {
      onSuccess() {
        toast.success("آیتم مورد نظر حذف شد");
        queryClient.invalidateQueries({ queryKey: ["tutor-dashboard"] });
      },
    });
  };

  if (tutorPending) {
    return (
      <div className="space-y-6" dir="rtl">
        <Skeleton className="h-10 w-48" />
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-2xl font-black text-slate-800">
        مدیریت دوره‌های آموزشی
      </h1>
      <section className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
        <form onSubmit={handleSubmitCourse(onAddCourse)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <CustomInput
              label="عنوان دوره"
              error={courseErrors.course_title?.message as string}
              {...registerCourse("course_title")}
            />
            <CustomInput
              label="مدت زمان (دقیقه)"
              type="number"
              error={courseErrors.duration_minutes?.message as string}
              {...registerCourse("duration_minutes", { valueAsNumber: true })}
            />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 text-right">
                نوع دوره
              </label>
              <select
                className="w-full rounded-xl border border-slate-200 p-3 bg-white text-right"
                {...registerCourse("course_type")}
              >
                <option value="online">آنلاین</option>
                <option value="offline">آفلاین</option>
              </select>
              {courseErrors.course_type && (
                <span className="text-xs text-red-500 text-right">
                  {courseErrors.course_type.message as string}
                </span>
              )}
            </div>
            <CustomInput
              label="قیمت هر ساعت (تومان)"
              type="number"
              error={courseErrors.price_per_hour?.message as string}
              {...registerCourse("price_per_hour", { valueAsNumber: true })}
            />
            <CustomInput
              label="پکیج درس (مثلا ۱۰ جلسه)"
              error={courseErrors.lesson_package?.message as string}
              {...registerCourse("lesson_package")}
            />
            <CustomInput
              label="زبان"
              error={courseErrors.language?.message as string}
              {...registerCourse("language")}
            />
            <CustomInput
              label="تاریخ شروع"
              type="date"
              error={courseErrors.start_date?.message as string}
              {...registerCourse("start_date")}
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 text-right">
              توضیحات دوره
            </label>
            <textarea
              className="w-full rounded-xl border border-slate-200 p-3 min-h-24 text-right"
              {...registerCourse("description")}
            />
            {courseErrors.description && (
              <span className="text-xs text-red-500 text-right">
                {courseErrors.description.message as string}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={addCoursePending}
            className="rounded-2xl bg-indigo-600 py-3 px-6 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 disabled:opacity-70 mt-4"
          >
            {addCoursePending ? "..." : "افزودن دوره"}
          </button>
        </form>

        <div className="space-y-4 mt-12 pt-12 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            دوره‌های ثبت شده
          </h2>
          {tutorData?.tutor?.courses?.map((course: any) => (
            <div
              key={course.id}
              className="flex justify-between items-center border border-slate-100 bg-slate-50/50 p-4 rounded-2xl transition-all hover:bg-white hover:shadow-md hover:shadow-indigo-50 cursor-pointer"
              onClick={() => {
                setSelectedCourse(course);
                setIsModalOpen(true);
              }}
            >
              <div>
                <p className="font-bold text-slate-800 text-right">
                  {course.course_title}
                </p>
                <p className="text-sm text-slate-500 font-medium text-right">
                  {course.language} - {course.price_per_hour} تومان/ساعت
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteItem(course.id);
                }}
                className="text-red-500 hover:text-red-700 text-sm font-bold transition-colors p-2"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedCourse && (
          <div className="space-y-4 text-right" dir="rtl">
            <h2 className="text-2xl font-black text-slate-800 border-b border-b-black/5 pb-4">
              {selectedCourse.course_title}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500">زبان</p>
                <p className="font-bold">{selectedCourse.language}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">نوع دوره</p>
                <p className="font-bold">
                  {selectedCourse.course_type === "online"
                    ? "آنلاین"
                    : "آفلاین"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">مدت زمان</p>
                <p className="font-bold">
                  {selectedCourse.duration_minutes} دقیقه
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">قیمت هر ساعت</p>
                <p className="font-bold">
                  {selectedCourse.price_per_hour} تومان
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">پکیج درس</p>
                <p className="font-bold">{selectedCourse.lesson_package}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">تاریخ شروع</p>
                <p className="font-bold">{selectedCourse.start_date}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500">توضیحات</p>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {selectedCourse.description}
              </p>
            </div>
            <div className="pt-4 border-t border-t-black/5 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
              >
                بستن
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
