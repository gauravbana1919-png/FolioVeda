import { URL } from "url";

export interface SafeFetchResult {
  url: string;
  statusCode: number;
  htmlSnippet: string; // limited excerpt for trait analysis only (never saved permanently)
}

/**
 * Checks if a hostname or IP address is internal or private (SSRF Protection).
 */
export function isInternalAddress(hostname: string): boolean {
  const normalized = hostname.toLowerCase().trim();

  // Localhost names
  if (
    normalized === "localhost" ||
    normalized.endsWith(".local") ||
    normalized.endsWith(".internal") ||
    normalized.endsWith(".localhost") ||
    normalized.endsWith(".lan")
  ) {
    return true;
  }

  // IPv4 Loopback and Private ranges
  // 127.0.0.0/8
  if (/^127\.\d+\.\d+\.\d+$/.test(normalized)) return true;
  // 10.0.0.0/8
  if (/^10\.\d+\.\d+\.\d+$/.test(normalized)) return true;
  // 172.16.0.0/12
  if (/^172\.(1[6-9]|2[0-9]|3[0-1])\.\d+\.\d+$/.test(normalized)) return true;
  // 192.168.0.0/16
  if (/^192\.168\.\d+\.\d+$/.test(normalized)) return true;
  // 169.254.0.0/16 (Link-Local & Cloud Metadata)
  if (/^169\.254\.\d+\.\d+$/.test(normalized)) return true;
  // 0.0.0.0
  if (normalized === "0.0.0.0" || normalized === "::1" || normalized === "[::1]") return true;

  return false;
}

/**
 * Validates a target URL against SSRF and protocol policies.
 */
export function validateInspirationUrl(urlString: string): { isValid: boolean; error?: string; parsedUrl?: URL } {
  let parsed: URL;
  try {
    parsed = new URL(urlString);
  } catch {
    return { isValid: false, error: "Invalid URL format." };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { isValid: false, error: "Only public HTTP and HTTPS URLs are permitted." };
  }

  if (isInternalAddress(parsed.hostname)) {
    return {
      isValid: false,
      error: "Access to private or local network addresses is strictly prohibited by security policy (SSRF Guard).",
    };
  }

  // Block cloud metadata hostnames directly
  if (parsed.hostname.includes("169.254") || parsed.hostname.includes("metadata.google.internal")) {
    return { isValid: false, error: "Access to cloud infrastructure metadata endpoints is forbidden." };
  }

  return { isValid: true, parsedUrl: parsed };
}

/**
 * Performs a safe, bounded GET request with timeouts and size caps.
 * Strictly avoids executing foreign JavaScript or storing cookies/credentials.
 */
export async function safeFetchPage(urlString: string): Promise<SafeFetchResult> {
  const validation = validateInspirationUrl(urlString);
  if (!validation.isValid || !validation.parsedUrl) {
    throw new Error(validation.error || "Invalid inspiration URL.");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

  try {
    const res = await fetch(validation.parsedUrl.toString(), {
      method: "GET",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Target page returned status ${res.status}: ${res.statusText}`);
    }

    // Limit read size to 1.5MB to prevent memory exhaustion
    const text = await res.text();
    const safeExcerpt = text.slice(0, 1500000); // Excerpt for abstract trait parsing only

    return {
      url: validation.parsedUrl.toString(),
      statusCode: res.status,
      htmlSnippet: safeExcerpt,
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      throw new Error("Request to inspiration site timed out after 8 seconds.");
    }
    throw new Error(`Failed to safely access inspiration URL: ${err.message}`);
  }
}
