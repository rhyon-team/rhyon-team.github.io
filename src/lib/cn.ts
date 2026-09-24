import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge solo conoce los tamaños de Tailwind. Sin declarar la escala
 * propia, toma `text-display-lg` por un color y lo descarta al combinarlo con
 * `text-content-inverse`: el titulo pierde su tamaño.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display-sm', 'display-md', 'display-lg', 'display-xl'] }],
    },
  },
});

/**
 * Combina clases condicionales y resuelve conflictos de Tailwind.
 *
 * Sin esto, `cn('px-4', 'px-8')` dejaria ambas y ganaria la que el CSS
 * ordene ultima. twMerge descarta la anterior y devuelve 'px-8', que es lo
 * que permite que un componente acepte `class` para sobrescribir su estilo.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
