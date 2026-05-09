import TutorCard from "@/shared/components/tutorCard";

const tutors = [
  {
    id: 0,
    name: "علی رضایی",
    specialty: "توسعه‌دهنده Next.js",
    image: "/images/instructor-1.jpg",
  },
  {
    id: 1,
    name: "سارا محمدی",
    specialty: "متخصص React و TypeScript",
    image: "/images/instructor-2.jpg",
  },
  {
    id: 2,
    name: "محمد احمدی",
    specialty: "مدرس Tailwind CSS",
    image: "/images/instructor-3.jpg",
  },
];

function Tutors() {
  return (
    <div dir="rtl">
      <h2 className="font-bold text-xl lg:text-2xl mt-10">اساتید منتخب</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.id} {...tutor} />
        ))}
      </div>
    </div>
  );
}

export default Tutors;
