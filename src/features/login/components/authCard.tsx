type AuthCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 sm:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-transparent to-purple-50/60 pointer-events-none" />

      <div className="relative">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-sm leading-6 text-gray-500">
              {description}
            </p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
