"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMe, useResetPassword } from "@/shared/api/services/auth";
import Skeleton from "@/shared/components/skeleton";
import { toast } from "react-toastify";
import {
  useUpdateTutor,
  useTutorDashboard,
  useAddCertificate,
  useDeleteCertificate,
  useAddEducation,
  useDeleteEducation,
  useAddExperience,
  useDeleteExperience,
} from "@/shared/api/services/tutor";
import { useQueryClient } from "@tanstack/react-query";
import CustomInput from "@/shared/components/customInput";

const tutorProfileSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  first_name: z.string().min(1, "نام الزامی است"),
  last_name: z.string().min(1, "نام خانوادگی الزامی است"),
});

const resetPasswordSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  new_password: z.string().min(8, "رمز عبور جدید باید حداقل ۸ کاراکتر باشد"),
});

const certificateSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  issued_by: z.string().optional(),
  issue_date: z.string().optional(),
});

const educationSchema = z.object({
  degree: z.string().min(1, "مدرک الزامی است"),
  institution_name: z.string().min(1, "نام موسسه الزامی است"),
  field: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

const experienceSchema = z.object({
  title: z.string().min(1, "عنوان شغلی الزامی است"),
  organization: z.string().min(1, "نام سازمان الزامی است"),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  description: z.string().optional(),
});

type TutorProfileFormValues = z.infer<typeof tutorProfileSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
type CertificateFormValues = z.infer<typeof certificateSchema>;
type EducationFormValues = z.infer<typeof educationSchema>;
type ExperienceFormValues = z.infer<typeof experienceSchema>;

function TutorProfile() {
  const queryClient = useQueryClient();
  const { isPending: mePending, data: meData, isError: meError } = useMe();
  const {
    isPending: tutorPending,
    data: tutorData,
    isError: tutorError,
  } = useTutorDashboard();

  const { mutate: updateProfile, isPending: mutatePending } = useUpdateTutor();
  const { mutate: mutatePass, isPending: resetPending } = useResetPassword();

  const { mutate: addCert, isPending: addCertPending } = useAddCertificate();
  const { mutate: deleteCert } = useDeleteCertificate();

  const { mutate: addEdu, isPending: addEduPending } = useAddEducation();
  const { mutate: deleteEdu } = useDeleteEducation();

  const { mutate: addExp, isPending: addExpPending } = useAddExperience();
  const { mutate: deleteExp } = useDeleteExperience();

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<TutorProfileFormValues>({
    resolver: zodResolver(tutorProfileSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
    },
  });

  const {
    register: registerResetPassword,
    handleSubmit: handleSubmitResetPassword,
    reset: resetResetPassword,
    formState: { errors: resetPasswordErrors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      new_password: "",
    },
  });

  const {
    register: registerCert,
    handleSubmit: handleSubmitCert,
    reset: resetCert,
    formState: { errors: certErrors },
  } = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
  });

  const {
    register: registerEdu,
    handleSubmit: handleSubmitEdu,
    reset: resetEdu,
    formState: { errors: eduErrors },
  } = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
  });

  const {
    register: registerExp,
    handleSubmit: handleSubmitExp,
    reset: resetExp,
    formState: { errors: expErrors },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
  });

  useEffect(() => {
    if (!meData) return;

    resetProfile({
      email: meData.email ?? "",
      first_name: meData.first_name ?? "",
      last_name: meData.last_name ?? "",
    });

    resetResetPassword({
      email: meData.email ?? "",
      new_password: "",
    });
  }, [meData, resetProfile, resetResetPassword]);

  const onSubmitProfile = (values: TutorProfileFormValues) => {
    updateProfile(values, {
      onSuccess() {
        toast.success("اطلاعات با موفقیت بروز رسانی شد");
        queryClient.invalidateQueries({ queryKey: ["me"] });
      },
    });
  };

  const onSubmitResetPassword = (values: ResetPasswordFormValues) => {
    mutatePass(values, {
      onSuccess() {
        toast.success("رمز عبور با موفقیت تغییر کرد");
        resetResetPassword();
      },
    });
  };

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

  const onAddEdu = (values: EducationFormValues) => {
    if (!tutorData?.tutor?.id) return;
    addEdu(
      { ...values, tutor: tutorData.tutor.id },
      {
        onSuccess() {
          toast.success("سابقه تحصیلی اضافه شد");
          resetEdu();
          queryClient.invalidateQueries({ queryKey: ["tutor-dashboard"] });
        },
      },
    );
  };

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

  const onDeleteItem = (id: number, type: "cert" | "edu" | "exp") => {
    const mutator =
      type === "cert" ? deleteCert : type === "edu" ? deleteEdu : deleteExp;
    mutator(id, {
      onSuccess() {
        toast.success("آیتم مورد نظر حذف شد");
        queryClient.invalidateQueries({ queryKey: ["tutor-dashboard"] });
      },
    });
  };

  if (mePending || tutorPending) {
    return (
      <div dir="rtl">
        <h1 className="text-2xl font-black mb-10">اطلاعات مدرس</h1>
        <div className="flex flex-col gap-10">
          <Skeleton className="h-20 max-w-200" />
          <Skeleton className="h-20 max-w-200" />
          <Skeleton className="h-20 max-w-200" />
          <Skeleton className="h-20 max-w-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20" dir="rtl">
      <section>
        <h1 className="text-2xl font-black mb-10 text-right">اطلاعات مدرس</h1>

        <form
          onSubmit={handleSubmitProfile(onSubmitProfile)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-right"
        >
          <CustomInput
            label="ایمیل"
            type="email"
            error={profileErrors.email?.message}
            {...registerProfile("email")}
          />

          <CustomInput
            label="نام"
            error={profileErrors.first_name?.message}
            {...registerProfile("first_name")}
          />

          <CustomInput
            label="نام خانوادگی"
            error={profileErrors.last_name?.message}
            {...registerProfile("last_name")}
          />

          <button
            type="submit"
            disabled={mutatePending}
            className="w-fit px-8 rounded-2xl bg-indigo-600 py-3 text-white font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 lg:col-span-2 disabled:opacity-70"
          >
            {mutatePending ? "لطفا صبر کنید..." : "ذخیره تغییرات"}
          </button>
        </form>
      </section>

      <section className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
        <h2 className="text-xl font-black mb-6 text-right text-slate-800">
          گواهینامه‌ها
        </h2>
        <div className="space-y-4 mb-8">
          {tutorData?.tutor?.certificates?.map((cert: any) => (
            <div
              key={cert.id}
              className="flex justify-between items-center border border-slate-100 bg-slate-50/50 p-4 rounded-2xl transition-all hover:bg-white hover:shadow-md hover:shadow-indigo-50"
            >
              <div>
                <p className="font-bold text-slate-800">{cert.title}</p>
                <p className="text-sm text-slate-500 font-medium">
                  {cert.issued_by}
                </p>
              </div>
              <button
                onClick={() => onDeleteItem(cert.id, "cert")}
                className="text-red-500 hover:text-red-700 text-sm font-bold transition-colors"
              >
                حذف
              </button>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmitCert(onAddCert)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          <CustomInput
            label="عنوان گواهینامه"
            error={certErrors.title?.message}
            {...registerCert("title")}
          />
          <CustomInput
            label="صادر کننده"
            error={certErrors.issued_by?.message}
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
      </section>

      <section className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
        <h2 className="text-xl font-black mb-6 text-right text-slate-800">
          سوابق تحصیلی
        </h2>
        <div className="space-y-4 mb-8">
          {tutorData?.tutor?.educations?.map((edu: any) => (
            <div
              key={edu.id}
              className="flex justify-between items-center border border-slate-100 bg-slate-50/50 p-4 rounded-2xl transition-all hover:bg-white hover:shadow-md hover:shadow-indigo-50"
            >
              <div>
                <p className="font-bold text-slate-800">{edu.degree}</p>
                <p className="text-sm text-slate-500 font-medium">
                  {edu.institution_name}
                </p>
              </div>
              <button
                onClick={() => onDeleteItem(edu.id, "edu")}
                className="text-red-500 hover:text-red-700 text-sm font-bold transition-colors"
              >
                حذف
              </button>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmitEdu(onAddEdu)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          <CustomInput
            label="مقطع/مدرک"
            error={eduErrors.degree?.message}
            {...registerEdu("degree")}
          />
          <CustomInput
            label="نام دانشگاه/موسسه"
            error={eduErrors.institution_name?.message}
            {...registerEdu("institution_name")}
          />
          <CustomInput
            label="حوزه/زمینه"
            error={eduErrors.field?.message}
            {...registerEdu("field")}
          />
          <CustomInput
            type="date"
            {...registerEdu("start_date")}
            label="تاریخ شروع"
          />
          <CustomInput
            type="date"
            {...registerEdu("end_date")}
            label="تاریخ پایان"
          />
          <button
            type="submit"
            disabled={addEduPending}
            className="rounded-2xl bg-indigo-600 py-3 px-6 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 disabled:opacity-70"
          >
            {addEduPending ? "..." : "افزودن مدرک"}
          </button>
        </form>
      </section>

      {/* Experience Section */}
      <section className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
        <h2 className="text-xl font-black mb-6 text-right text-slate-800">
          سوابق کاری
        </h2>
        <div className="space-y-4 mb-8">
          {tutorData?.tutor?.experiences?.map((exp: any) => (
            <div
              key={exp.id}
              className="flex justify-between items-center border border-slate-100 bg-slate-50/50 p-4 rounded-2xl transition-all hover:bg-white hover:shadow-md hover:shadow-indigo-50"
            >
              <div>
                <p className="font-bold text-slate-800">{exp.title}</p>
                <p className="text-sm text-slate-500 font-medium">
                  {exp.organization}
                </p>
              </div>
              <button
                onClick={() => onDeleteItem(exp.id, "exp")}
                className="text-red-500 hover:text-red-700 text-sm font-bold transition-colors"
              >
                حذف
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmitExp(onAddExp)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <CustomInput
              label="عنوان شغلی"
              error={expErrors.title?.message}
              {...registerExp("title")}
            />
            <CustomInput
              label="سازمان"
              error={expErrors.organization?.message}
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
            <label className="block text-sm font-semibold text-gray-700">
              توضیحات
            </label>
            <textarea
              className="w-full rounded-xl border border-slate-200 p-3 min-h-24"
              {...registerExp("description")}
            />
          </div>

          <button
            type="submit"
            disabled={addExpPending}
            className="rounded-2xl bg-indigo-600 py-3 px-6 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 disabled:opacity-70"
          >
            {addExpPending ? "..." : "افزودن سابقه"}
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-black mb-10 text-right text-slate-800">
          تغییر رمز عبور
        </h2>

        <form
          onSubmit={handleSubmitResetPassword(onSubmitResetPassword)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-right"
        >
          <input type="hidden" {...registerResetPassword("email")} />

          <CustomInput
            label="رمز عبور جدید"
            type="password"
            placeholder="رمز عبور جدید را وارد کنید"
            error={resetPasswordErrors.new_password?.message}
            {...registerResetPassword("new_password")}
          />

          <button
            type="submit"
            disabled={resetPending}
            className="w-fit px-8 rounded-2xl bg-indigo-600 py-3 text-white font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 lg:col-span-2 disabled:opacity-70"
          >
            {resetPending ? "لطفا صبر کنید..." : "تغییر رمز عبور"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default TutorProfile;
