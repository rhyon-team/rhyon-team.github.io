import { useState } from 'react';

/**
 * Componente de ejemplo. Existe solo para verificar que las islas de React
 * funcionan (estado, eventos e hidratacion). Borralo al empezar la landing.
 */
export default function EjemploIsla() {
  const [clicks, setClicks] = useState(0);

  return (
    <button
      onClick={() => setClicks(clicks + 1)}
      className="rounded-md border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100"
    >
      Isla React activa — clicks: {clicks}
    </button>
  );
}
