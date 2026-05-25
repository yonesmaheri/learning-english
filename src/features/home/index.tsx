"use client";
import { useCourses } from "@/shared/api/services/courses";
import Blogs from "./components/blogs";
import Favorites from "./components/favorites";
import Tutors from "./components/tutors";
import { useBlogs } from "@/shared/api/services/blog";
import { useTutor } from "@/shared/api/services/tutor";

function HomePageTemplate() {
  const { isPending, data, isSuccess } = useCourses();
  const {
    isPending: blogPending,
    data: blogData,
    isSuccess: blogSuccess,
  } = useBlogs();
  const {
    isPending: tutorIsPending,
    isSuccess: tutorIsSuccess,
    data: tutorData,
  } = useTutor();

  return (
    <div className="flex flex-col">
      {isPending && blogPending && tutorIsPending ? (
        <div></div>
      ) : (
        isSuccess &&
        blogSuccess &&
        tutorIsSuccess && (
          <>
            <Favorites data={data} />
            <Tutors data={tutorData} />
            <Blogs data={blogData} />
          </>
        )
      )}
    </div>
  );
}

export default HomePageTemplate;
