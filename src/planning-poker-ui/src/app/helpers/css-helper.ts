export class CssHelper {
  static create(...params : string[]) {
    return params;
  }

  static join(classList: string[]): string {
    if (classList) return classList.join(' ');

    return '';
  }

  static addClass(classList: string[], className: string): string[] {
    if (!classList) return classList;

    if (classList.find((x) => x === className)) return classList;

    classList.push(className);
    return classList;
  }

  static removeClass(classList: string[], className: string): string[] {
    if (!classList) return classList;

    if (classList.find((x) => x === className)) return classList;

    return classList.filter((x) => x !== className);
  }
}
