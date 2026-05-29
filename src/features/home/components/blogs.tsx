import BlogCard from "@/shared/components/blogCard";
import Link from "next/link";

function Blogs({ data }: { data: any }) {
  return (
    <div dir="rtl" className="my-10">
      <div className="w-full flex items-center justify-between  mt-10">
        <h2 className="font-bold text-xl lg:text-2xl">آخرین مقالات</h2>
        <Link
          href={`/blog`}
          className="text-xs  text-gray-400 transition-all duration-300 group-hover:text-indigo-500 group-hover:border-indigo-500 border px-4 py-2.5 rounded-xl border-gray-400"
        >
          همه مقالات
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {data.map((blog: any) => {
          const persianDate = new Intl.DateTimeFormat(
            "fa-IR-u-ca-persian",
          ).format(new Date(blog.created_at));
          return (
            <BlogCard
              id={blog.id}
              key={blog.id}
              author={blog.author}
              excerpt={blog.description}
              publishedAt={persianDate}
              title={blog.title}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Blogs;
