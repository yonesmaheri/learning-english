import Image from "next/image";

type TutorCardProps = {
  user: { first_name: string; last_name: string };
  specialty: string;
  profile_picture: string;
};

export default function TutorCard({ tutor }: { tutor: TutorCardProps }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full ring-4 ring-indigo-50 transition-all duration-300 group-hover:scale-105 group-hover:ring-indigo-100">
          <img
            src={tutor.profile_picture}
            alt={tutor.user.first_name}
            className="object-cover"
          />
        </div>

        <h3 className="text-lg font-extrabold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">
          {tutor.user.first_name} {tutor.user.last_name}
        </h3>

        <p className="mt-2 text-sm font-medium text-gray-500">{}</p>
      </div>
    </div>
  );
}
