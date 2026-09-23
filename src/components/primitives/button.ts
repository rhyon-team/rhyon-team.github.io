import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Definicion de variantes del boton, separada del componente .astro para que
 * la pueda reutilizar tambien un componente React (isla) sin duplicar clases.
 */
export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium whitespace-nowrap',
    'rounded-md border border-transparent',
    'transition-[background-color,border-color,color,box-shadow,transform]',
    'duration-200 ease-[var(--ease-out-quint)]',
    'active:translate-y-px',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-accent text-accent-content shadow-sm hover:bg-accent-hover hover:shadow-md',
        secondary:
          'bg-surface-raised text-content border-line-strong shadow-xs hover:bg-surface-sunken',
        outline: 'border-accent text-accent hover:bg-accent-soft',
        ghost: 'text-content hover:bg-surface-sunken',
        link: 'text-accent underline underline-offset-4 hover:text-accent-hover',
      },
      size: {
        sm: 'h-9 px-3.5 text-sm',
        md: 'h-11 px-5 text-sm',
        lg: 'h-13 px-7 text-base',
      },
      full: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      full: false,
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
