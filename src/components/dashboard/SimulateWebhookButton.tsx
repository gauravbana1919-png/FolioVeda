"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Check, RefreshCw, Terminal } from "lucide-react";

export function SimulateWebhookButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const router = useRouter();

  const handleSimulate = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/webhooks/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        setResult(`Synced ${data.simulatedRepo}!`);
        router.refresh();
        setTimeout(() => setResult(null), 4000);
      } else {
        setResult("Simulation failed.");
      }
    } catch (err) {
      console.error(err);
      setResult("Error simulating webhook.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSimulate}
        disabled={loading}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-all shadow-sm hover:shadow disabled:opacity-50"
        title="Simulate a signed GitHub webhook push event"
      >
        {loading ? (
          <>
            <RefreshCw size={13} className="animate-spin" />
            <span>Simulating push...</span>
          </>
        ) : (
          <>
            <Terminal size={13} />
            <span>Simulate GitHub Push</span>
          </>
        )}
      </button>

      {result && (
        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 animate-fade-in">
          <Check size={13} />
          {result}
        </span>
      )}
    </div>
  );
}
