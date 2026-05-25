"use client";
import { useBlogs } from "@/shared/api/services/blog";
import BlogCard from "@/shared/components/blogCard";
import Skeleton from "@/shared/components/skeleton";

function Blogs() {
  const { isPending, isSuccess, data } = useBlogs();
  return (
    <div dir="rtl">
      <h1 className="text-base lg:text-2xl font-black my-5">وبلاگ</h1>
      {isPending ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Skeleton className="h-100 max-full" />
          <Skeleton className="h-100 max-full" />
          <Skeleton className="h-100 max-full" />
          <Skeleton className="h-100 max-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {data.map((item: any) => {
            const persianDate = new Intl.DateTimeFormat(
              "fa-IR-u-ca-persian",
            ).format(new Date(item.created_at));
            return (
              <BlogCard
                key={item.id}
                author={item.author}
                excerpt={item.description}
                publishedAt={persianDate}
                title={item.title}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Blogs;
