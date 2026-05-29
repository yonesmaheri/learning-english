"use client";

import { useBlog } from "@/shared/api/services/blog";
import Image from "next/image";
import { useParams } from "next/navigation";

function BlogPost() {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading, isError } = useBlog(id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-2/3 rounded bg-gray-200" />
          <div className="h-[400px] rounded-3xl bg-gray-200" />
          <div className="space-y-3">
            <div className="h-4 rounded bg-gray-200" />
            <div className="h-4 rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="py-20 text-center text-red-500">خطا در دریافت مقاله</div>
    );
  }

  return (
    <section className=" my-15">
      <div className="w-full ">
        <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="relative min-h-[420px] w-full">
            <img
              src={data.picture}
              alt={data.title}
              
              className="object-cover"
            />
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="rounded-full bg-indigo-50 px-4 py-1.5 font-semibold text-indigo-600">
                {data.category}
              </span>

              <span>{data.author}</span>

              <span>•</span>

              <span>
                {new Date(data.created_at).toLocaleDateString("fa-IR")}
              </span>

              <span>•</span>

              <span>{data.difficulty_level}</span>
            </div>

            <h1 className="mb-6 text-4xl font-black leading-tight text-gray-900">
              {data.title}
            </h1>

            <p className="mb-10 text-lg leading-8 text-gray-600">
              {data.description}
            </p>

            <div className="prose prose-lg max-w-none whitespace-pre-line leading-9 text-gray-700">
              {data.content}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default BlogPost;
