"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const CORPORATE_GREEN = "#003B32";

export function StepsTimeline() {
  const t = useTranslations("StepsSection");
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [visibleSteps, setVisibleSteps] = useState<number>(0);
  const [lineProgress, setLineProgress] = useState(0);

  const steps = [
    { title: t("step1Title"), description: t("step1Desc") },
    { title: t("step2Title"), description: t("step2Desc") },
    { title: t("step3Title"), description: t("step3Desc") },
  ];

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            setVisibleSteps(1);
            setLineProgress(33);
            timersRef.current.push(
              setTimeout(() => {
                setVisibleSteps(2);
                setLineProgress(66);
              }, 200),
            );
            timersRef.current.push(
              setTimeout(() => {
                setVisibleSteps(3);
                setLineProgress(100);
              }, 400),
            );
            break;
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      {/* Vertical connector line - background (gray) */}
      <div
        className="absolute left-[23px] top-8 bottom-24 w-0.5 bg-gray-200 rounded-full hidden sm:block"
        aria-hidden
      />
      {/* Vertical connector line - progress (green) */}
      <div
        className="absolute left-[23px] top-8 w-0.5 rounded-full transition-all duration-700 ease-out hidden sm:block"
        style={{
          height: `${lineProgress}%`,
          maxHeight: "calc(100% - 6rem)",
          backgroundColor: CORPORATE_GREEN,
        }}
        aria-hidden
      />

      <ol className="space-y-10 sm:space-y-12">
        {steps.map((step, index) => (
          <li
            key={index}
            className={cn(
              "relative flex gap-6 sm:gap-8 transition-all duration-500",
              visibleSteps > index
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
          >
            {/* Node circle */}
            <div
              className="relative z-10 flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold text-xl sm:text-2xl text-white"
              style={{ backgroundColor: CORPORATE_GREEN }}
              aria-hidden
            >
              {index + 1}
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0 pt-1">
              <h3
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: CORPORATE_GREEN }}
              >
                {step.title}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-[#4A4A4A]">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* CTA Button - end of timeline */}
      <div className="relative z-10 mt-12 sm:mt-14 pl-0 sm:pl-0">
        <Link
          href="/questionnaire"
          className={cn(
            "inline-flex items-center justify-center min-h-[52px] px-10 py-4 text-lg font-semibold text-white",
            "bg-[#004F56] rounded-xl hover:bg-[#004F56]/90 hover:scale-[1.02] transition-all duration-300 shadow-lg",
            "focus:outline-none focus:ring-2 focus:ring-[#004F56] focus:ring-offset-2",
          )}
        >
          {t("btnCTA")}
        </Link>
      </div>
    </div>
  );
}
