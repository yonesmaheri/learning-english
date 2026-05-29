"use client";

import Image from "next/image";
import { useStudentDashboard } from "@/shared/api/services/student";
import Skeleton from "@/shared/components/skeleton";
import { mapStatus } from "@/shared/lib/mapStatus";

function StudentPayments() {


  const { isPending, data, isError } = useStudentDashboard();

  const payments = data?.enrollments || [];

  return (
    <>
      <h1 className="mb-10 text-2xl font-black">پرداخت های دانش آموز</h1>

      {isPending ? (
        <div className="flex flex-col gap-6">
          <Skeleton className="h-44 w-full rounded-3xl" />
          <Skeleton className="h-44 w-full rounded-3xl" />
          <Skeleton className="h-44 w-full rounded-3xl" />
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-red-500">
          اطلاعاتی برای نمایش وجود ندارد
        </div>
      ) : payments.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          هنوز پرداختی ثبت نشده است
        </div>
      ) : (
        <div className="grid gap-6">
          {payments.map((payment: any) => (
            <div
              key={payment.id}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100"
            >
              <div className="flex flex-col gap-6 p-6 md:flex-row">
                <div className="relative h-52 w-full overflow-hidden rounded-2xl md:w-72">
                  <img
                    src={`http://localhost:8000${payment.payment_proof}`}
                    alt="payment proof"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      {mapStatus(payment.status)}
                    </div>

                    <h2 className="mb-2 text-2xl font-black text-gray-900">
                      {payment.course.title}
                    </h2>

                    <p className="mb-6 text-sm leading-7 text-gray-500">
                      {payment.course.description}
                    </p>

                    <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                      <div>
                        <span className="font-bold">مبلغ:</span>{" "}
                        {Number(payment.payment_amount).toLocaleString("fa-IR")}{" "}
                        تومان
                      </div>

                      <div>
                        <span className="font-bold">تاریخ:</span>{" "}
                        {new Date(payment.submitted_at).toLocaleDateString(
                          "fa-IR",
                        )}
                      </div>

                      <div>
                        <span className="font-bold">ارز:</span>{" "}
                        {payment.currency}
                      </div>
                    </div>
                  </div>

                  {payment.payment_note && (
                    <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-sm leading-7 text-gray-600">
                      {payment.payment_note}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default StudentPayments;
