import Link from "next/link";

type BlogCardProps = {
  title: string;
  author: string;
  publishedAt: string;
  excerpt: string;
  href?: string;
};

export default function BlogCard({
  title,
  author,
  publishedAt,
  excerpt,
  href = "/blog",
}: BlogCardProps) {
  return (
    <article className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100">
      <div className="flex h-full flex-col">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-600">
            {author}
          </span>
          <span>{publishedAt}</span>
        </div>

        <h3 className="mb-3 line-clamp-2 text-lg font-extrabold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">
          {title}
        </h3>

        <p className="mb-6 line-clamp-3 text-sm leading-7 text-gray-600">
          {excerpt}
        </p>

        <div className="mt-auto">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-all duration-300 hover:gap-3"
          >
            مطالعه مقاله
            <span>←</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
