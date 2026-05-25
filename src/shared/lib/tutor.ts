import { z } from "zod";

export const tutorProfileSchema = z.object({
  user_email: z.string().email("ایمیل معتبر نیست"),
  user_first_name: z.string().min(1, "نام الزامی است"),
  user_last_name: z.string().min(1, "نام خانوادگی الزامی است"),
  country: z.string().min(1, "کشور الزامی است"),
  phone_number: z.string().min(1, "شماره تماس الزامی است"),

  bio: z.string().min(10, "حداقل ۱۰ کاراکتر وارد کنید"),
  teaching_style: z.string().min(10, "حداقل ۱۰ کاراکتر وارد کنید"),
  expectation: z.string().min(10, "حداقل ۱۰ کاراکتر وارد کنید"),
  description: z.string().min(10, "حداقل ۱۰ کاراکتر وارد کنید"),

  languages_spoken: z.string().min(1, "حداقل یک زبان را وارد کنید"),

  subjects: z.string().min(1, "حداقل یک درس را وارد کنید"),

  profile_picture: z
    .any()
    .refine((file) => file instanceof File, "تصویر پروفایل الزامی است")
    .refine((file) => file?.type?.startsWith("image/"), "فایل باید تصویر باشد"),
});
