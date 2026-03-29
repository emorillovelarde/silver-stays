interface ComparisonTableProps {
  children: React.ReactNode;
}

export function ComparisonTable({ children }: ComparisonTableProps) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border-2 border-primary/20 bg-white shadow-lg [&_thead]:bg-primary/10 [&_th]:px-4 sm:px-6 [&_th]:py-4 [&_th]:text-base sm:text-lg [&_th]:font-bold [&_th]:text-primary [&_th]:border-b-2 [&_th]:border-primary/20  [&_td]:px-4 sm:px-6 [&_td]:py-4 [&_td]:text-base sm:text-lg [&_td]:text-[#1A1A1A] [&_td]:border-b [&_td]:border-gray-200 [&_td]:align-top [&_tr:last-child_td]:border-b-0 [&_tbody_tr]:hover:bg-primary/5">
      <table className="w-full min-w-[400px] sm:min-w-[600px] text-left border-collapse">
        {children}
      </table>
    </div>
  );
}
