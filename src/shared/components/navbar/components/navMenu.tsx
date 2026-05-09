import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
};

type NavMenuProps = {
  items: NavItem[];
  mobile?: boolean;
};

export default function NavMenu({ items, mobile = false }: NavMenuProps) {
  if (mobile) {
    return (
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group relative block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:text-indigo-600"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute bottom-2 right-4 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-10" />
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex items-center gap-2 lg:gap-6">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-indigo-600"
          >
            <span>{item.label}</span>

            <span className="absolute bottom-0 right-1/2 h-0.5 w-0 translate-x-1/2 rounded-full bg-indigo-600 transition-all duration-300 group-hover:w-4/5" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
