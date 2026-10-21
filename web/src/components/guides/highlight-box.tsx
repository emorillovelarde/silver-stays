import { Info, AlertTriangle, CheckCircle } from "lucide-react";

type HighlightBoxType = "info" | "warning" | "success";

interface HighlightBoxProps {
  type?: HighlightBoxType;
  children: React.ReactNode;
}

const styles: Record<
  HighlightBoxType,
  { bg: string; border: string; icon: React.ReactNode }
> = {
  info: {
    bg: "bg-primary/5",
    border: "border-primary/30",
    icon: <Info className="h-6 w-6 text-primary shrink-0" aria-hidden />,
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: (
      <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0" aria-hidden />
    ),
  },
  success: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: (
      <CheckCircle className="h-6 w-6 text-emerald-600 shrink-0" aria-hidden />
    ),
  },
};

export function HighlightBox({ type = "info", children }: HighlightBoxProps) {
  const { bg, border, icon } = styles[type];
  return (
    <div
      className={`my-6 flex gap-4 rounded-xl border-2 ${border} ${bg} p-6`}
      role="note"
    >
      {icon}
      <div className="text-lg leading-relaxed text-[#1A1A1A] [&>p]:mb-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
