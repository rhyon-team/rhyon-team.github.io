import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { NavItem } from '../../lib/site';

interface Props {
  items?: NavItem[];
}

/**
 * Menu de navegacion para pantallas chicas.
 *
 * Es una isla: React se carga solo para este componente. El resto del header
 * es HTML estatico. Se monta con client:media para que ni siquiera se
 * descargue en desktop, donde el menu no se usa.
 */
export default function MobileNav({ items = [] }: Props) {
  const [open, setOpen] = useState(false);
  const botonRef = useRef<HTMLButtonElement>(null);
  const primerEnlaceRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (open) primerEnlaceRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      botonRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (items.length === 0) return null;

  return (
    <>
      <button
        ref={botonRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
        className="text-content hover:bg-surface-sunken inline-flex h-10 w-10 items-center justify-center rounded-md transition"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          {open ? (
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M3 6h14M3 13h14"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {/* El panel se monta en <body> y no adentro del header: el backdrop-blur
          del header lo convierte en la referencia de los elementos fixed, y el
          panel quedaria del alto del header en vez de ocupar la pantalla. */}
      {open &&
        createPortal(
          <div
            id="mobile-nav"
            className="bg-surface fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto px-5 py-8"
          >
            <nav aria-label="Navegacion principal">
              <ul className="flex flex-col gap-1">
                {items.map((item, indice) => (
                  <li key={item.href}>
                    <a
                      ref={indice === 0 ? primerEnlaceRef : undefined}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-content hover:bg-surface-sunken font-display block rounded-md px-3 py-3 text-2xl transition"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}
