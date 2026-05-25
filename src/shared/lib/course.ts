import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, "عنوان دوره باید حداقل ۳ کاراکتر باشد"),
  description: z.string().min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
  detail: z.string().optional(),
  requirements: z.string().optional(),
  materials: z.string().optional(),
  price_per_hour: z.string().min(1, "قیمت هر ساعت الزامی است"),
  price_per_dollar: z.string().min(1, "قیمت به دلار الزامی است"),
  price_per_toman: z.string().min(1, "قیمت به تومان الزامی است"),
  language: z.string().min(2, "زبان الزامی است"),
  level: z.string().min(1, "سطح الزامی است"),
  schedule_day: z.string().min(1, "روزهای تشکیل کلاس الزامی است"),
  schedule_start: z.string().min(1, "زمان شروع الزامی است"),
  schedule_end: z.string().min(1, "زمان پایان الزامی است"),
  capacity: z.string().min(1, "ظرفیت الزامی است"),
  length: z.string().min(1, "طول دوره الزامی است"),
  course_duration: z.string().min(1, "مدت زمان هر جلسه الزامی است"),
  image: z.any().optional(),
  language_flag: z.any().optional(),
});
