export function mapStatus(status: string) {
  switch (status) {
    case "pending_payment":
      return (
        <div className="inline-block rounded-full bg-blue-600/80 px-3 py-1 text-xs text-white">
          در انتظار پرداخت
        </div>
      );

    case "draft":
      return (
        <div className="inline-block rounded-full bg-gray-600/80 px-3 py-1 text-xs text-white">
          نامشخص
        </div>
      );

    case "under_review":
      return (
        <div className="inline-block rounded-full bg-yellow-500/80 px-3 py-1 text-xs text-white">
          در حال بررسی
        </div>
      );

    case "approved":
      return (
        <div className="inline-block rounded-full bg-green-600/80 px-3 py-1 text-xs text-white">
          تایید شده
        </div>
      );

    case "rejected":
      return (
        <div className="inline-block rounded-full bg-red-600/80 px-3 py-1 text-xs text-white">
          رد شده
        </div>
      );

    case "cancelled":
      return (
        <div className="inline-block rounded-full bg-orange-600/80 px-3 py-1 text-xs text-white">
          انصراف داده شده
        </div>
      );

    default:
      return null;
  }
}
