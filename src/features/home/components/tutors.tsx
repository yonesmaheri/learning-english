import TutorCard from "@/shared/components/tutorCard";
import Link from "next/link";

function Tutors({ data }: { data: any[] }) {
  return (
    <div dir="rtl">
      <div className="w-full flex items-center justify-between mt-10">
        <h2 className="font-bold text-xl lg:text-2xl">اساتید منتخب</h2>
        <Link
          href={`/tutors`}
          className="text-xs  text-gray-400 transition-all duration-300 group-hover:text-indigo-500 group-hover:border-indigo-500 border px-4 py-2.5 rounded-xl border-gray-400"
        >
          همه مدرسان
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {data.slice(0, 3).map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
}

export default Tutors;
