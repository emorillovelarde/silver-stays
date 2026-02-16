import type { MDXComponents } from "mdx/types";

/** Returns MDX components for use in Server Components (no hooks) */
export function getMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-[#006D77] mb-6 mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-[#006D77] mb-4 mt-8 border-b border-[#006D77]/20 pb-2">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="text-lg leading-relaxed text-gray-800 mb-6">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-gray-800">
        {children}
      </ul>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-[#006D77] underline underline-offset-4 hover:text-teal-800 font-medium transition-colors"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#006D77] pl-4 italic bg-teal-50/50 py-2 rounded-r-lg text-gray-700">
        {children}
      </blockquote>
    ),
    ...components,
  };
}

/** Hook version for Client Components - re-exports for next-mdx compatibility */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getMDXComponents(components);
}
