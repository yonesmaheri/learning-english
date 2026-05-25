"use client";

import { useMe } from "@/shared/api/services/auth";
import Skeleton from "@/shared/components/skeleton";

function TutorDashboard() {
  const { isPending, data, isError } = useMe();

  return (
    <>
      <h1 className="text-2xl font-black mb-10">داشبورد مدرس</h1>
      {isPending ? (
        <div className="flex flex-col gap-10">
          <Skeleton className="h-20 max-w-200" />
          <Skeleton className="h-20 max-w-200" />
          <Skeleton className="h-20 max-w-200" />
          <Skeleton className="h-20 max-w-200" />
        </div>
      ) : isError ? (
        <>اطلاعاتی برای نمایش وجود ندارد</>
      ) : (
        <div className="w-full flex flex-col"></div>
      )}
    </>
  );
}

export default TutorDashboard;
