import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
