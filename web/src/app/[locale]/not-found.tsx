import { Link } from "@/i18n/routing";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] px-4 text-center">
      <h1 className="text-7xl font-bold text-brand-navy mb-4">404</h1>
      <p className="text-xl text-slate-600 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center bg-brand-cta hover:bg-brand-cta-hover text-white px-6 py-3 rounded-full font-medium transition-colors"
      >
        Back to Home
      </Link>
    </main>
  );
}
