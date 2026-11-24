import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileText, AlertTriangle, Scale } from "lucide-react";
import { FolioInLogo } from "@/components/ui/Logo";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0A0F1D] text-slate-100 font-sans selection:bg-emerald-500/30">
      {/* Top Header */}
      <header className="border-b border-white/[0.08] bg-[#0A0F1D]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} /> Hub
            </Link>
            <div className="h-4 w-[1px] bg-white/[0.1]" />
            <FolioInLogo size="sm" showBadge={false} />
            <span className="text-xs font-mono text-slate-400">/ Legal & Terms</span>
          </div>
          <Link
            href="/legal/takedown"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Takedown / DMCA Form ↗
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Scale size={13} /> Institutional Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            FolioIn Terms of Service & Inspiration Safe-Use Policy
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-2">
            Last Updated: October 2026 • Effective Worldwide
          </p>
        </div>

        {/* Lawyer Review Advisory Box */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5 flex items-start gap-3 text-xs text-amber-200">
          <AlertTriangle size={20} className="text-amber-400 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
              Note for Legal Counsel (Pre-Launch Review)
            </p>
            <p className="text-amber-200/90 leading-relaxed">
              This policy has been architected under standard copyright jurisprudence (distinguishing copyrightable expression from non-copyrightable ideas, layout concepts, and mathematical color harmonies). Please conduct final attorney review prior to public commercial launch.
            </p>
          </div>
        </div>

        {/* Highlighted Safe-Use Notice */}
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-6 space-y-2">
          <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-widest font-mono">
            Mandatory Inspiration Notice
          </h2>
          <p className="text-lg font-bold text-white">
            "Inspired designs are original creations. Do not use others' text, images, or branding."
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            FolioIn provides an aesthetic translation engine. Users are strictly prohibited from submitting, publishing, or claiming ownership of third-party copyrighted text, trademarks, logos, client case studies, or photography.
          </p>
        </div>

        {/* Detailed Clauses */}
        <div className="space-y-8 text-sm text-slate-300 leading-relaxed border-t border-white/[0.08] pt-8">
          <section className="space-y-2">
            <h3 className="text-lg font-bold text-white">1. Abstract Aesthetic Extraction vs. Proprietary Code</h3>
            <p>
              When a user submits an external website URL to the FolioIn Inspiration Link Engine, our automated sandboxed parser extracts only abstract, high-level design parameters:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-slate-400">
              <li>Overall spatial density (compact, comfortable, spacious).</li>
              <li>Typography classification (e.g., modern-grotesk, editorial-serif, monospace).</li>
              <li>Color mood and mathematical harmonies.</li>
              <li>Section ordering rhythm (e.g. projects prior to experience).</li>
            </ul>
            <p className="text-xs text-slate-400">
              FolioIn <strong>never</strong> downloads, mirrors, copies, or stores source HTML, CSS rules, JavaScript scripts, exact font binaries, raster images, SVG illustrations, or personal identifying information of the target site owner.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-white">2. Open-Source Font Substitution</h3>
            <p>
              FolioIn does not utilize or mirror proprietary font files from analyzed sites. All synthesized themes reference strictly licensed Google Fonts and open-source system font stacks.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-white">3. Automated Similarity Guard</h3>
            <p>
              To ensure full compliance with originality standards, our platform runs an automated mathematical Similarity Guard. Any synthesized output scoring above a 0.78 similarity index is automatically diversified (adjusting color hue, typography scale, and card padding) to maintain distinct visual distance.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-white">4. Zero-Hallucination & Factual Accuracy</h3>
            <p>
              Users retain sole responsibility for the factual truth of all accomplishments, metrics, employers, and degrees listed in their portfolio. FolioIn’s AI copy engine operates under a zero-hallucination mandate, generating wording solely anchored in user-submitted proof.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-white">5. Takedown & Copyright Infringement Claims</h3>
            <p>
              FolioIn respects the intellectual property rights of all creators and engineers. If you believe any live portfolio hosted on our platform infringes upon your copyrighted materials, please submit a notice via our dedicated{" "}
              <Link href="/legal/takedown" className="text-emerald-400 underline font-semibold">
                Takedown Portal
              </Link>
              . All verified claims are addressed within 24 business hours.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/[0.08] py-8 px-6 text-center text-xs text-slate-500 font-mono">
        FolioIn Legal & Compliance • Institutional Architecture • 2026
      </footer>
    </div>
  );
}
