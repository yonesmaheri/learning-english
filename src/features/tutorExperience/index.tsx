"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import {
  useTutorDashboard,
  useAddExperience,
  useDeleteExperience,
} from "@/shared/api/services/tutor";
import CustomInput from "@/shared/components/customInput";
import Skeleton from "@/shared/components/skeleton";
import Modal from "@/shared/components/modal";

const experienceSchema = z.object({
  title: z.string().min(1, "عنوان شغلی الزامی است"),
  organization: z.string().min(1, "نام سازمان الزامی است"),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  description: z.string().optional(),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

export default function TutorExperience() {
  const queryClient = useQueryClient();
  const [selectedExp, setSelectedExp] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isPending: tutorPending, data: tutorData } = useTutorDashboard();
  const { mutate: addExp, isPending: addExpPending } = useAddExperience();
  const { mutate: deleteExp } = useDeleteExperience();

  const {
    register: registerExp,
    handleSubmit: handleSubmitExp,
    reset: resetExp,
    formState: { errors: expErrors },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
  });

  const onAddExp = (values: ExperienceFormValues) => {
    if (!tutorData?.tutor?.id) return;
    addExp(
      { ...values, tutor: tutorData.tutor.id },
      {
        onSuccess() {
          toast.success("سابقه کاری اضافه شد");
          resetExp();
          queryClient.invalidateQueries({ queryKey: ["tutor-dashboard"] });
        },
      },
    );
  };

  const onDeleteItem = (id: number) => {
    deleteExp(id, {
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
      <h1 className="text-2xl font-black text-slate-800">مدیریت سوابق کاری</h1>
      <section className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
        <form onSubmit={handleSubmitExp(onAddExp)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <CustomInput
              label="عنوان شغلی"
              error={expErrors.title?.message as string}
              {...registerExp("title")}
            />
            <CustomInput
              label="سازمان"
              error={expErrors.organization?.message as string}
              {...registerExp("organization")}
            />
            <CustomInput
              label="تاریخ شروع"
              type="date"
              {...registerExp("start_date")}
            />
            <CustomInput
              label="تاریخ پایان"
              type="date"
              {...registerExp("end_date")}
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 text-right">
              توضیحات
            </label>
            <textarea
              className="w-full rounded-xl border border-slate-200 p-3 min-h-24 text-right"
              {...registerExp("description")}
            />
          </div>

          <button
            type="submit"
            disabled={addExpPending}
            className="rounded-2xl bg-indigo-600 py-3 px-6 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 disabled:opacity-70 mt-4"
          >
            {addExpPending ? "..." : "افزودن سابقه"}
          </button>
        </form>

        <div className="space-y-4 mt-12 pt-12 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            سوابق ثبت شده
          </h2>
          {tutorData?.tutor?.experiences?.map((exp: any) => (
            <div
              key={exp.id}
              className="flex justify-between items-center border border-slate-100 bg-slate-50/50 p-4 rounded-2xl transition-all hover:bg-white hover:shadow-md hover:shadow-indigo-50 cursor-pointer"
              onClick={() => {
                setSelectedExp(exp);
                setIsModalOpen(true);
              }}
            >
              <div>
                <p className="font-bold text-slate-800 text-right">
                  {exp.title}
                </p>
                <p className="text-sm text-slate-500 font-medium text-right">
                  {exp.organization}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteItem(exp.id);
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
        {selectedExp && (
          <div className="space-y-4 text-right" dir="rtl">
            <h2 className="text-2xl font-black text-slate-800 border-b border-b-black/5 pb-4">
              {selectedExp.title}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500">سازمان</p>
                <p className="font-bold">{selectedExp.organization}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">تاریخ شروع</p>
                <p className="font-bold">{selectedExp.start_date || "---"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">تاریخ پایان</p>
                <p className="font-bold">{selectedExp.end_date || "---"}</p>
              </div>
            </div>
            {selectedExp.description && (
              <div>
                <p className="text-sm text-slate-500">توضیحات</p>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedExp.description}
                </p>
              </div>
            )}
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
