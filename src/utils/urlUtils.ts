import crypto from "crypto";

/**
 * Check if a URL is valid
 * @param url The URL to check
 * @returns Whether the URL is valid
 * @example
 * isUrlValid("https://example.com"); // true
 */
export const isUrlValid = (url: string): boolean => {
  const urlRegex =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+)(:[0-9]{1,5})?(\/[^\s]*)?$/;
  return urlRegex.test(url);
};

/**
 * Generate a random short URL
 * @param length The length of the short URL
 * @returns A random short URL
 * @example
 * generateShortUrl(6); // 6 characters long
 */
export const generateShortUrl = (length: number = 6): string => {
  // Generate a random string
  return crypto.randomBytes(length).toString("hex").slice(0, length);
};
