import BlogCard from "@/shared/components/blogCard";
import React from "react";

const blogs = [
  {
    title: "چگونه با Next.js یک پروژه حرفه‌ای بسازیم؟",
    author: "علی رضایی",
    publishedAt: "۱۴۰۵/۰۲/۱۹",
    excerpt:
      "در این مقاله با ساختار مناسب پروژه در Next.js، بهترین روش‌های کامپوننت‌بندی و نکات مهم برای توسعه پروژه‌های حرفه‌ای آشنا می‌شویم.",
    href: "/blog/nextjs-professional-project",
  },
  {
    title: "مزایای استفاده از Tailwind CSS در پروژه‌های مدرن",
    author: "سارا محمدی",
    publishedAt: "۱۴۰۵/۰۲/۱۵",
    excerpt:
      "Tailwind CSS یکی از محبوب‌ترین ابزارها برای طراحی سریع و مقیاس‌پذیر رابط کاربری است. در این مقاله مزایا و دلایل استفاده از آن را بررسی می‌کنیم.",
    href: "/blog/tailwind-benefits",
  },
  {
    title: "بهترین روش‌های طراحی UI برای وب‌سایت‌های آموزشی",
    author: "محمد احمدی",
    publishedAt: "۱۴۰۵/۰۲/۱۰",
    excerpt:
      "اگر در حال طراحی یک وب‌سایت آموزشی هستید، رعایت اصول تجربه کاربری و ساختار مناسب محتوا نقش مهمی در موفقیت محصول شما خواهد داشت.",
    href: "/blog/educational-ui-design",
  },
];

function Blogs() {
  return (
    <div dir="rtl" className="mt-10">
      <h2 className="font-bold text-xl lg:text-2xl">آخرین مقالات</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.href} {...blog} />
        ))}
      </div>
    </div>
  );
}

export default Blogs;
