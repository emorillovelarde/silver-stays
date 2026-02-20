import type { MDXComponents } from "mdx/types";
import { EnergyArbitrageCalculatorClient } from "@/components/guides/energy-arbitrage-calculator-client";
import { GuideImage } from "@/components/guides/guide-image";
import {
  NLVSolvencyCalculatorClient,
  SchengenClockAlertClient,
} from "@/components/guides/nlv-components-client";
import { NLVGuideCTA } from "@/components/guides/nlv-cta";

/** Returns MDX components for use in Server Components (no hooks) */
export function getMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    GuideImage,
    EnergyArbitrageCalculator: EnergyArbitrageCalculatorClient,
    NLVSolvencyCalculator: NLVSolvencyCalculatorClient,
    SchengenClockAlert: SchengenClockAlertClient,
    NLVGuideCTA,
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-[#004F56] mb-6 mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-[#004F56] mb-4 mt-8 border-b border-[#004F56]/20 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-[#004F56] mb-4 mt-6">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-lg leading-relaxed text-[#1A1A1A] mb-6">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-[#1A1A1A]">
        {children}
      </ul>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-[#004F56] underline underline-offset-4 hover:text-[#004F56]/80 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#004F56] focus:ring-offset-2 rounded"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#004F56] pl-4 italic bg-teal-50/50 py-2 rounded-r-lg text-[#1A1A1A] my-6">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-8 rounded-xl border-2 border-primary/20 shadow-lg bg-white">
        <table className="w-full min-w-[520px] text-left border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-primary/10">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="hover:bg-primary/5 transition-colors border-b border-gray-100 last:border-b-0">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-5 py-4 text-base font-bold text-primary border-b-2 border-r border-primary/20 text-left last:border-r-0">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-5 py-4 text-base text-gray-800 border-b border-r border-gray-200 last:border-r-0">
        {children}
      </td>
    ),
    ...components,
  };
}

/** Hook version for Client Components - re-exports for next-mdx compatibility */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getMDXComponents(components);
}
