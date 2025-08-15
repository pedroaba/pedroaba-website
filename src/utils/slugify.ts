/**
 * Convert a string to a slug
 *
 * @example
 * slugify('Hello World') // 'hello-world'
 * slugify('Hello World!') // 'hello-world'
 * slugify('Hello World!') // 'hello-world'
 *
 * @param text - The text to convert to a slug
 * @returns The slugified text
 */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
