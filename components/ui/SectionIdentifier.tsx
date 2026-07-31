export function SectionIdentifier({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-body-sm font-semibold text-[#131F1C] bg-[#DBDCCE] ${
        className ?? ""
      }`}
    >
      {children}
    </span>
  );
}
