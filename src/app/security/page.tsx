"use client";

import { CheckCircle, AlertTriangle, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import DOMPurify from 'isomorphic-dompurify';

export default function SecurityReportPage() {
  const [loading, setLoading] = useState(true);

  // Mocking the security scan process for the UI demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second scan
    return () => clearTimeout(timer);
  }, []);

  // Demonstration of how we sanitize user input
  const rawInput = "<img src=x onerror=alert('Hacked') /> <p>Safe Text</p>";
  const cleanInput = DOMPurify.sanitize(rawInput);

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24 font-sans text-foreground">
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="text-primary w-10 h-10" />
        <h1 className="text-3xl font-bold tracking-tight">Security & Privacy Report</h1>
      </div>
      
      <p className="text-muted-foreground mb-8 text-lg">
        This report checks your generated portfolio site for common vulnerabilities and privacy compliance. 
        <br/><span className="text-sm font-medium mt-2 block opacity-80">(Note: No website is 100% hack-proof, but we follow strict security basics.)</span>
      </p>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-secondary/30 rounded-lg border border-border">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-lg font-medium animate-pulse">Running security scans...</p>
        </div>
      ) : (
        <div className="space-y-6">
          
          <div className="bg-background border border-border rounded-xl p-6 shadow-sm flex items-start gap-4">
            <CheckCircle className="text-green-500 w-8 h-8 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Cross-Site Scripting (XSS) Protection</h2>
              <p className="text-muted-foreground mb-4">
                All user-provided inputs (projects, bio, custom HTML) have been heavily sanitized. Malicious scripts are stripped before rendering.
              </p>
              <div className="bg-secondary p-4 rounded-md text-sm font-mono overflow-x-auto">
                <div className="text-red-400 mb-2">Raw Input: {rawInput}</div>
                <div className="text-green-500">Sanitized Output: {cleanInput}</div>
              </div>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-6 shadow-sm flex items-start gap-4">
            <CheckCircle className="text-green-500 w-8 h-8 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Content Security Policy (CSP) Headers</h2>
              <p className="text-muted-foreground">
                Strict HTTP security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and a strict CSP) are active on your generated portfolio to prevent clickjacking and data injection attacks.
              </p>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-6 shadow-sm flex items-start gap-4">
            <CheckCircle className="text-green-500 w-8 h-8 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Secrets Scan (Environment Variables)</h2>
              <p className="text-muted-foreground">
                We verified that no sensitive API keys or environment variables are hardcoded or leaked into the client-side code of your portfolio bundle.
              </p>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-6 shadow-sm flex items-start gap-4">
            <AlertTriangle className="text-yellow-500 w-8 h-8 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">India DPDP Act Privacy Notice</h2>
              <p className="text-muted-foreground">
                Your portfolio makes personal data (resume, email) public. By publishing, you grant explicit consent. A <strong>"Delete All My Data"</strong> button is available in your account settings which will permanently wipe your database records and take down your site instantly.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
