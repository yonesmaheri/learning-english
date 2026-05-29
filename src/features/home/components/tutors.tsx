import TutorCard from "@/shared/components/tutorCard";
import Link from "next/link";

function Tutors({ data }: { data: any[] }) {
  return (
    <div dir="rtl">
      <div className="w-full flex items-center justify-between mt-10">
        <h2 className="font-bold text-xl lg:text-2xl">اساتید منتخب</h2>
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
