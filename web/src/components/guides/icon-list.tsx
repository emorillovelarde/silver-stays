interface IconListProps {
  children: React.ReactNode;
}

export function IconList({ children }: IconListProps) {
  return (
    <div className="my-6 [&>ul]:list-none [&>ul]:space-y-4 [&>ul]:pl-0 [&>ul]:text-lg [&>ul]:text-[#1A1A1A] [&_li]:leading-relaxed">
      {children}
    </div>
  );
}
