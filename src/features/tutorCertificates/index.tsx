"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import {
  useTutorDashboard,
  useAddCertificate,
  useDeleteCertificate,
} from "@/shared/api/services/tutor";
import CustomInput from "@/shared/components/customInput";
import Skeleton from "@/shared/components/skeleton";
import Modal from "@/shared/components/modal";

const certificateSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  issued_by: z.string().optional(),
  issue_date: z.string().optional(),
});

type CertificateFormValues = z.infer<typeof certificateSchema>;

export default function TutorCertificates() {
  const queryClient = useQueryClient();
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isPending: tutorPending, data: tutorData } = useTutorDashboard();
  const { mutate: addCert, isPending: addCertPending } = useAddCertificate();
  const { mutate: deleteCert } = useDeleteCertificate();

  const {
    register: registerCert,
    handleSubmit: handleSubmitCert,
    reset: resetCert,
    formState: { errors: certErrors },
  } = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
  });

  const onAddCert = (values: CertificateFormValues) => {
    if (!tutorData?.tutor?.id) return;
    addCert(
      { ...values, tutor: tutorData.tutor.id },
      {
        onSuccess() {
          toast.success("گواهینامه اضافه شد");
          resetCert();
          queryClient.invalidateQueries({ queryKey: ["tutor-dashboard"] });
        },
      },
    );
  };

  const onDeleteItem = (id: number) => {
    deleteCert(id, {
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
        مدیریت گواهینامه‌ها
      </h1>
      <section className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
        <form
          onSubmit={handleSubmitCert(onAddCert)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          <CustomInput
            label="عنوان گواهینامه"
            error={certErrors.title?.message as string}
            {...registerCert("title")}
          />
          <CustomInput
            label="صادر کننده"
            error={certErrors.issued_by?.message as string}
            {...registerCert("issued_by")}
          />
          <CustomInput
            type="date"
            {...registerCert("issue_date")}
            label="تاریخ اخذ گواهینامه"
          />
          <button
            type="submit"
            disabled={addCertPending}
            className="rounded-2xl bg-indigo-600 py-3 px-6 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 disabled:opacity-70"
          >
            {addCertPending ? "..." : "افزودن گواهینامه"}
          </button>
        </form>

        <div className="space-y-4 mt-12 pt-12 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            گواهینامه‌های ثبت شده
          </h2>
          {tutorData?.tutor?.certificates?.map((cert: any) => (
            <div
              key={cert.id}
              className="flex justify-between items-center border border-slate-100 bg-slate-50/50 p-4 rounded-2xl transition-all hover:bg-white hover:shadow-md hover:shadow-indigo-50 cursor-pointer"
              onClick={() => {
                setSelectedCert(cert);
                setIsModalOpen(true);
              }}
            >
              <div>
                <p className="font-bold text-slate-800 text-right">
                  {cert.title}
                </p>
                <p className="text-sm text-slate-500 font-medium text-right">
                  {cert.issued_by}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteItem(cert.id);
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
        {selectedCert && (
          <div className="space-y-4 text-right" dir="rtl">
            <h2 className="text-2xl font-black text-slate-800 border-b border-b-black/5 pb-4">
              جزئیات گواهینامه
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <p className="text-sm text-slate-500">عنوان گواهینامه</p>
                <p className="font-bold">{selectedCert.title}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">صادر کننده</p>
                <p className="font-bold">{selectedCert.issued_by || "---"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">تاریخ اخذ</p>
                <p className="font-bold">{selectedCert.issue_date || "---"}</p>
              </div>
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
