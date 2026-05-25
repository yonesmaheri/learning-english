import BlogCard from "@/shared/components/blogCard";


function Blogs({ data }: { data: any }) {
  return (
    <div dir="rtl" className="my-10">
      <h2 className="font-bold text-xl lg:text-2xl">آخرین مقالات</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {data.map((blog: any) => {
          const persianDate = new Intl.DateTimeFormat(
            "fa-IR-u-ca-persian",
          ).format(new Date(blog.created_at));
          return (
            <BlogCard
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
