"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema } from "@/shared/lib/course";
import { z } from "zod";
import CustomInput from "@/shared/components/customInput";
import { useCreateCourse } from "@/shared/api/services/courses";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof courseSchema>;

export default function CreateCourse() {
  const router = useRouter();
  const { mutate, isPending } = useCreateCourse();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(courseSchema),
  });

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null && value !== "") {
        formData.append(key, String(value));
      }
    });

    mutate(formData, {
      onSuccess() {
        toast.success("دوره با موفقیت ایجاد شد");
        router.push("/dashboard/tutor/courses");
      },
      onError() {
        toast.error("خطا در ایجاد دوره");
      },
    });
  };

  return (
    <div dir="rtl" className="mt-10 pb-20">
      <h1 className="text-2xl font-black mb-10">ایجاد دوره جدید</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-6 w-full grid grid-cols-1 lg:grid-cols-2 text-right"
      >
        <CustomInput
          label="عنوان دوره"
          error={errors.title?.message}
          {...register("title")}
        />

        <CustomInput
          label="زبان دوره"
          placeholder="مثلاً انگلیسی، فرانسوی"
          error={errors.language?.message}
          {...register("language")}
        />

        <CustomInput
          label="سطح دوره"
          placeholder="مثلاً مقدماتی، متوسط، پیشرفته"
          error={errors.level?.message}
          {...register("level")}
        />

        <CustomInput
          label="روزهای تشکیل کلاس"
          placeholder="مثلاً شنبه و دوشنبه"
          error={errors.schedule_day?.message}
          {...register("schedule_day")}
        />

        <CustomInput
          label="زمان شروع (HH:MM)"
          type="time"
          error={errors.schedule_start?.message}
          {...register("schedule_start")}
        />

        <CustomInput
          label="زمان پایان (HH:MM)"
          type="time"
          error={errors.schedule_end?.message}
          {...register("schedule_end")}
        />

        <CustomInput
          label="قیمت هر ساعت (تومان)"
          type="number"
          error={errors.price_per_hour?.message}
          {...register("price_per_hour")}
        />

        <CustomInput
          label="قیمت به دلار"
          type="number"
          error={errors.price_per_dollar?.message}
          {...register("price_per_dollar")}
        />

        <CustomInput
          label="قیمت به تومان (کل دوره)"
          type="number"
          error={errors.price_per_toman?.message}
          {...register("price_per_toman")}
        />

        <CustomInput
          label="ظرفیت (تعداد دانشجو)"
          type="number"
          error={errors.capacity?.message}
          {...register("capacity")}
        />

        <CustomInput
          label="طول دوره (تعداد جلسات)"
          type="number"
          error={errors.length?.message}
          {...register("length")}
        />

        <CustomInput
          label="مدت زمان هر جلسه (دقیقه)"
          type="number"
          error={errors.course_duration?.message}
          {...register("course_duration")}
        />

        <div className="col-span-2">
          <label className="block text-sm font-semibold mb-2">توضیحات کوتاه</label>
          <textarea
            {...register("description")}
            className="w-full rounded-xl border border-slate-200 p-3 min-h-24"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-semibold mb-2">جزئیات دوره</label>
          <textarea
            {...register("detail")}
            className="w-full rounded-xl border border-slate-200 p-3 min-h-32"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-semibold mb-2">نیازمندی‌ها</label>
          <textarea
            {...register("requirements")}
            className="w-full rounded-xl border border-slate-200 p-3 min-h-24"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-semibold mb-2">منابع آموزشی</label>
          <textarea
            {...register("materials")}
            className="w-full rounded-xl border border-slate-200 p-3 min-h-24"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">تصویر دوره</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("image", file, { shouldValidate: true });
              }
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">پرچم زبان</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("language_flag", file, { shouldValidate: true });
              }
            }}
          />
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="w-full rounded-xl bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 mt-6 col-span-2"
        >
          {isPending ? "لطفا صبر کنید..." : "ایجاد دوره"}
        </button>
      </form>
    </div>
  );
}
