interface FeatureGridProps {
  children: React.ReactNode;
}

export function FeatureGrid({ children }: FeatureGridProps) {
  return (
    <div className="my-8 grid gap-6 sm:grid-cols-2 [&>.persona-card]:rounded-xl [&>.persona-card]:border-2 [&>.persona-card]:border-[#004F56]/20 [&>.persona-card]:bg-white [&>.persona-card]:p-6 [&>.persona-card]:shadow-md [&>.lifestyle-card]:rounded-xl [&>.lifestyle-card]:border-2 [&>.lifestyle-card]:border-[#004F56]/20 [&>.lifestyle-card]:bg-white [&>.lifestyle-card]:p-6 [&>.lifestyle-card]:shadow-md [&>.health-card]:rounded-xl [&>.health-card]:border-2 [&>.health-card]:border-[#004F56]/20 [&>.health-card]:bg-white [&>.health-card]:p-6 [&>.health-card]:shadow-md [&>.regulation-card]:rounded-xl [&>.regulation-card]:border-2 [&>.regulation-card]:border-[#004F56]/20 [&>.regulation-card]:bg-white [&>.regulation-card]:p-6 [&>.regulation-card]:shadow-md [&>.audit-card]:rounded-xl [&>.audit-card]:border-2 [&>.audit-card]:border-[#004F56]/20 [&>.audit-card]:bg-white [&>.audit-card]:p-6 [&>.audit-card]:shadow-md">
      {children}
    </div>
  );
}
