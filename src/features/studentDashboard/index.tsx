"use client";

import { useMe } from "@/shared/api/services/auth";
import { useStudentDashboard } from "@/shared/api/services/student";
import Skeleton from "@/shared/components/skeleton";
import Link from "next/link";

function StudentDashboard() {
  function mapStatus(status: string) {
    switch (status) {
      case "pending_payment":
        return (
          <div className="inline-block w-fit text-xs text-white py-1 px-2 rounded-full bg-blue-600/80">
            در انتظار پرداخت
          </div>
        );
      case "draft":
        return (
          <div className="inline-block w-fit text-xs text-white py-1 px-2 rounded-full bg-gray-600/80">
            نامشخص
          </div>
        );
      case "under_review":
        return (
          <div className="inline-block w-fit text-xs text-white py-1 px-2 rounded-full bg-yellow-500/80">
            در حال بررسی
          </div>
        );
      case "approved":
        return (
          <div className="inline-block w-fit text-xs text-white py-1 px-2 rounded-full bg-green-600/80">
            تایید شده
          </div>
        );
      case "rejected":
        return (
          <div className="inline-block w-fit text-xs text-white py-1 px-2 rounded-full bg-red-600/80">
            رد شده
          </div>
        );
      case "cancelled":
        return (
          <div className="inline-block w-fit text-xs text-white py-1 px-2 rounded-full bg-orange-600/80">
            انصراف داده شده
          </div>
        );

      default:
        break;
    }
  }

  const { isPending, data, isError } = useStudentDashboard();
  const { data: myData, isSuccess } = useMe();
  return (
    <>
      <h1 className="text-2xl font-black mb-10">داشبورد دانش آموز</h1>
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
        isSuccess && (
          <div className="w-full flex flex-col gap-8">
            {/* profile card */}
            <div className="flex items-center gap-4 p-5 rounded-xl bg-white/60 shadow-lg border border-black/5">
              <img
                src={myData.profile_picture}
                alt="profile"
                className="w-16 h-16 rounded-full object-cover border"
              />

              <div className="flex flex-col">
                <p className="font-black text-lg">
                  {myData.first_name} {myData.last_name}
                </p>
                <p className="text-sm text-gray-500">{myData.email}</p>
              </div>
            </div>

            {/* courses */}
            <div className="w-full flex flex-col">
              <h2 className="font-bold text-lg">دوره های ثبت نام شده</h2>

              {data.enrollments.length === 0 ? (
                <div className="mt-6 flex flex-col items-center justify-center py-10 rounded-xl shadow-lg border border-black/5 bg-white/60 text-center">
                  <p className="text-gray-600 mb-2">
                    هنوز در دوره‌ای ثبت‌نام نکرده‌اید
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    پس از ثبت‌نام در دوره‌ها، اطلاعات آن‌ها در اینجا نمایش داده
                    می‌شود
                  </p>
                  <p className="text-sm text-gray-500">
                    جهت ثبت نام دوره{" "}
                    <Link
                      className="text-indigo-600 transition-colors duration-300 hover:text-indigo-700 underline"
                      href={"/courses"}
                    >
                      اینجا
                    </Link>{" "}
                    کلیک کنید
                  </p>
                </div>
              ) : (
                <div className="w-full mt-5 grid lg:grid-cols-2 grid-cols-1 gap-5">
                  {data.enrollments.map((item: any) => {
                    const persianDate = new Intl.DateTimeFormat(
                      "fa-IR-u-ca-persian",
                    ).format(new Date(item.submitted_at));

                    return (
                      <div
                        className="rounded-xl shadow-lg border border-black/5 bg-white/60 py-3 px-5 flex flex-col lg:flex-row justify-between items-start lg:items-center"
                        key={item.id}
                      >
                        <div>
                          <p className="text-sm lg:text-base mb-3">
                            نام دوره:{" "}
                            <span className="font-black">
                              {item.course.title}
                            </span>
                          </p>

                          <div className="text-sm lg:text-base mb-3 lg:mb-0">
                            وضعیت ثبت نام: {mapStatus(item.status)}
                          </div>
                        </div>

                        <div className="flex h-full flex-row w-full lg:w-fit lg:flex-col items-center justify-between text-sm lg:text-base">
                          <p>تاریخ ثبت نام</p>
                          {persianDate}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
}

export default StudentDashboard;
