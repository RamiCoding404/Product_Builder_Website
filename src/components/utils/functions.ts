/**
 *
 * @param {string} txt
 * @param {number} [max=50]
 * @returns
 */

//jsdoc clean code
export function txtSlicer(txt: string, max: number = 80) {
  if (txt.length >= max) return `${txt.slice(0, max)}...`;
  return txt;
}
