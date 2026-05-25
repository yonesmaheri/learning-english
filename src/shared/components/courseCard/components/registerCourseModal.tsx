"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../../modal";
import CustomInput from "../../customInput";
import { useEnroll } from "@/shared/api/services/courses";
import { toast } from "react-toastify";


const registerCourseSchema = z.object({
  currency: z.string().min(1, "انتخاب ارز الزامی است"),
  payment_amount: z
    .string()
    .min(1, "مبلغ پرداختی الزامی است")
    .refine((val) => !isNaN(Number(val)), {
      message: "مبلغ باید عدد باشد",
    }),
  payment_proof: z
    .any()
    .refine((file) => file instanceof File, "تصویر صورت حساب الزامی است"),
});

type RegisterCourseFormValues = z.infer<typeof registerCourseSchema>;

type RegisterCourseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;

};

export default function RegisterCourseModal({
  isOpen,
  onClose,
  courseId,
}: RegisterCourseModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate, isPending } = useEnroll();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterCourseFormValues>({
    resolver: zodResolver(registerCourseSchema),
    defaultValues: {
      currency: "",
      payment_amount: "",
      payment_proof: undefined,
    },
  });

  const paymentProof = watch("payment_proof");

  const onSubmit = async (values: RegisterCourseFormValues) => {
    const formData = new FormData();
    formData.append("course", String(courseId));
    formData.append("currency", values.currency);
    formData.append("payment_amount", values.payment_amount);
    formData.append("payment_proof", values.payment_proof);

    mutate(formData,{onSuccess(data, variables, onMutateResult, context) {
      toast.success('دوره ثبت نام شد')
    },onError(error, variables, onMutateResult, context) {
      toast.error('دوره از قبل ثبت نام شده است')
    },})
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-right">
        <div>
          <h2 className="text-xl font-bold text-gray-900">فرم ثبت‌نام دوره</h2>
          <p className="mt-1 text-sm text-gray-600">
            لطفاً اطلاعات پرداخت را تکمیل کنید.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              ارز
            </label>
            <select
              {...register("currency")}
              className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 focus:ring-4 ${
                errors.currency
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            >
              <option value="">انتخاب کنید</option>
              <option value="IRR">تومان</option>
              <option value="USD">دلار</option>
              <option value="EUR">یورو</option>
            </select>

            {errors.currency && (
              <p className="mt-2 text-sm font-medium text-red-500">
                {errors.currency.message}
              </p>
            )}
          </div>

          <CustomInput
            label="مبلغ پرداختی"
            type="text"
            placeholder="مثلاً 500000"
            error={errors.payment_amount?.message}
            {...register("payment_amount")}
          />

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              تصویر صورت حساب
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setValue("payment_proof", file, { shouldValidate: true });
              }}
              className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 file:ml-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100 ${
                errors.payment_proof
                  ? "border-red-300 focus:border-red-400"
                  : "border-gray-200 focus:border-indigo-500"
              }`}
            />

            {paymentProof instanceof File && (
              <p className="text-xs text-gray-500">
                فایل انتخاب‌شده: {paymentProof.name}
              </p>
            )}

            {errors.payment_proof && (
              <p className="text-sm font-medium text-red-500">
                {errors.payment_proof.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-700 disabled:opacity-50"
          >
            {isPending ? "لطفا صبر کنید..." : "ثبت درخواست"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
