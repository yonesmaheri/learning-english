type UserType = "student" | "tutor";

type AuthTabsProps = {
  activeTab: UserType;
  onChange: (tab: UserType) => void;
};

export default function AuthTabs({ activeTab, onChange }: AuthTabsProps) {
  return (
    <div className="mb-6 rounded-2xl bg-gray-100 p-1">
      <div className="grid grid-cols-2 gap-1">
        <button
          type="button"
          onClick={() => onChange("student")}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
            activeTab === "student"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          ثبت‌نام دانشجو
        </button>

        <button
          type="button"
          onClick={() => onChange("tutor")}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
            activeTab === "tutor"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          ثبت‌نام مدرس
        </button>
      </div>
    </div>
  );
}
