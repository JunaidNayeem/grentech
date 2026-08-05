/**
 * JS-side mirrors of the CSS motion tokens in app/globals.css (--dur-* and --ease-*).
 * Framer Motion needs plain numbers/arrays, not CSS custom properties, so these
 * constants are the single place to keep the two in sync.
 */
export const DUR_1 = 0.12
export const DUR_2 = 0.2
export const DUR_3 = 0.32
export const DUR_4 = 0.56

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1]
export const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1]
