/**
 * Generates a URL-friendly slug from a project title.
 * Example: "My Cool Project!" → "my-cool-project"
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove special chars except hyphens
    .replace(/\s+/g, '-')     // spaces → hyphens
    .replace(/-+/g, '-')      // collapse multiple hyphens
    .replace(/^-+|-+$/g, ''); // trim leading/trailing hyphens
}

/**
 * Formats an ISO date string to a human-readable format.
 * Example: "2024-03-01" → "Mar 2024"
 */
export function formatDate(dateStr: string | undefined | null): string {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Truncates a string to the given length, appending "…" if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Converts a File to a base64 data URL string.
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Validates a file for size and type.
 */
export function validateImageFile(
  file: File,
  maxSizeMB: number,
  allowedTypes: string[]
): string | null {
  if (!allowedTypes.includes(file.type)) {
    return `Invalid file type. Allowed: ${allowedTypes.join(', ')}`;
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    return `File too large. Max size is ${maxSizeMB}MB`;
  }
  return null;
}

/**
 * Returns a relative "time ago" string from a date.
 * Example: "2 days ago"
 */
export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Ensures a URL is absolute by prepending https:// if it doesn't start with http:// or https://
 */
export function ensureAbsoluteUrl(url: string | undefined | null): string {
  if (!url) return '#';
  if (url === '#') return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}
