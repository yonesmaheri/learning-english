import TutorCard from "@/shared/components/tutorCard";

function Tutors({ data }: { data: any[] }) {
  return (
    <div dir="rtl">
      <h2 className="font-bold text-xl lg:text-2xl mt-10">اساتید منتخب</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {data.slice(0,3).map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
}

export default Tutors;
