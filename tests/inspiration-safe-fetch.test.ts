import { describe, it, expect } from "vitest";
import { isInternalAddress, validateInspirationUrl } from "../src/lib/inspiration/safe-fetch";
import { extractAbstractStyleProfile } from "../src/lib/inspiration/analyzer";
import { InspirationAnalyzeInputSchema, StyleProfileSchema } from "../src/types/inspiration";

describe("Stage 6: Inspiration Link Engine - SSRF Guard & Abstract Style Extractor", () => {
  it("should strictly identify internal, private and cloud metadata addresses", () => {
    expect(isInternalAddress("localhost")).toBe(true);
    expect(isInternalAddress("subdomain.local")).toBe(true);
    expect(isInternalAddress("127.0.0.1")).toBe(true);
    expect(isInternalAddress("127.0.0.254")).toBe(true);
    expect(isInternalAddress("10.0.0.1")).toBe(true);
    expect(isInternalAddress("172.16.5.1")).toBe(true);
    expect(isInternalAddress("192.168.1.100")).toBe(true);
    expect(isInternalAddress("169.254.169.254")).toBe(true); // AWS/GCP metadata
    expect(isInternalAddress("0.0.0.0")).toBe(true);
    expect(isInternalAddress("::1")).toBe(true);

    // Public domains must pass
    expect(isInternalAddress("example.com")).toBe(false);
    expect(isInternalAddress("pattin.design")).toBe(false);
    expect(isInternalAddress("github.com")).toBe(false);
  });

  it("should block non-HTTP and internal URLs in validateInspirationUrl", () => {
    const fileCheck = validateInspirationUrl("file:///etc/passwd");
    expect(fileCheck.isValid).toBe(false);
    expect(fileCheck.error).toContain("Only public HTTP and HTTPS");

    const localhostCheck = validateInspirationUrl("http://localhost:3000/admin");
    expect(localhostCheck.isValid).toBe(false);
    expect(localhostCheck.error).toContain("SSRF Guard");

    const awsMetadataCheck = validateInspirationUrl("http://169.254.169.254/latest/meta-data/");
    expect(awsMetadataCheck.isValid).toBe(false);

    const validCheck = validateInspirationUrl("https://example.com/portfolio");
    expect(validCheck.isValid).toBe(true);
    expect(validCheck.parsedUrl?.hostname).toBe("example.com");
  });

  it("should validate InspirationAnalyzeInputSchema and require user consent", () => {
    const invalidNoConsent = {
      url: "https://example.com",
      userConsent: false,
    };
    const parse1 = InspirationAnalyzeInputSchema.safeParse(invalidNoConsent);
    expect(parse1.success).toBe(false);

    const validConsent = {
      url: "https://example.com",
      userConsent: true,
    };
    const parse2 = InspirationAnalyzeInputSchema.safeParse(validConsent);
    expect(parse2.success).toBe(true);
  });

  it("should extract abstract style profile from dark terminal-like portfolio", () => {
    const darkSnippet = `
      <html>
        <head><link href="https://fonts.googleapis.com/css?family=JetBrains+Mono" rel="stylesheet"></head>
        <body class="bg-[#0d1117] text-white font-mono">
          <div class="terminal-container">bash prompt</div>
        </body>
      </html>
    `;

    const profile = extractAbstractStyleProfile(darkSnippet, "https://developer.example.com");
    const valid = StyleProfileSchema.safeParse(profile);
    expect(valid.success).toBe(true);
    expect(profile.layoutPattern).toBe("terminal-grid");
    expect(profile.fontCategory).toBe("monospace-code");
    expect(profile.surfaceBrightness).toBe("dark");
    expect(profile.dominantColors.length).toBeGreaterThanOrEqual(2);
  });

  it("should extract abstract style profile from editorial serif portfolio", () => {
    const editorialSnippet = `
      <html>
        <head><link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet"></head>
        <body class="bg-white text-zinc-900 font-serif">
          <h1>Editorial Selected Works & Case Studies</h1>
        </body>
      </html>
    `;

    const profile = extractAbstractStyleProfile(editorialSnippet, "https://designer.example.com");
    const valid = StyleProfileSchema.safeParse(profile);
    expect(valid.success).toBe(true);
    expect(profile.fontCategory).toBe("editorial-serif");
    expect(profile.surfaceBrightness).toBe("light");
    expect(profile.dominantColors).toBeDefined();
  });
});
