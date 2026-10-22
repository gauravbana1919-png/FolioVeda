import { LogoShowcase } from "@/components/ui/LogoShowcase";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "FolioVeda Brand & Logo Studio",
  description: "Explore and configure the original vector logos, brand colors, and visual identity for FolioVeda.",
};

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Master Studio</span>
        </Link>

        <span className="text-xs text-indigo-400 font-medium">
          FolioVeda Design System &bull; v2.0
        </span>
      </div>

      <LogoShowcase />
    </div>
  );
}
