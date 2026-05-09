type MobileMenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function MobileMenuButton({
  isOpen,
  onClick,
}: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle Menu"
      className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:border-indigo-600"
    >
      <div className="relative h-5 w-5">
        <span
          className={`absolute right-0 top-1 h-0.5 w-5 rounded-full bg-gray-800 transition-all duration-300 ${
            isOpen ? "top-2.5 right-px rotate-45" : ""
          }`}
        />
        <span
          className={`absolute right-0 top-2.5 h-0.5 w-5 rounded-full bg-gray-800 transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`absolute right-0 top-4 h-0.5 w-5 rounded-full bg-gray-800 transition-all duration-300 ${
            isOpen ? "top-2.5! right-px -rotate-45" : ""
          }`}
        />
      </div>
    </button>
  );
}
