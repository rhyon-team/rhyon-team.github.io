# Estilo de código

Aplica a todo el proyecto.

## El código se explica solo o está mal escrito

El objetivo es que alguien que abre un archivo por primera vez entienda qué
hace sin leer comentarios. Si hace falta un comentario para entender **qué**
hace una línea, la línea está mal escrita.

```ts
// mal: el comentario compensa un nombre pobre
// chequea si el usuario puede editar
const c = u.r === 'admin' || u.r === 'editor';

// bien: el nombre dice lo que el comentario decía
const puedeEditar = usuario.rol === 'admin' || usuario.rol === 'editor';
```

## Comentarios

Un comentario explica **por qué**, nunca **qué**. Si describe lo que el código
ya dice, sobra y se borra.

```ts
// mal: repite el código
// incrementa el contador en 1
contador += 1;

// mal: obvio
// importa react
import { useState } from 'react';

// bien: explica una decisión que el código no puede expresar
// scroll-padding compensa el header sticky: sin esto, los anclas quedan
// tapados por el header al saltar a una sección.
scroll-padding-top: 5rem;
```

Merecen comentario:

- Una decisión con alternativas descartadas por una razón concreta.
- Un workaround de un bug externo, con enlace o referencia.
- Una restricción no evidente (límite de una API, requisito legal, algo que
  rompe en un navegador puntual).
- Una fórmula o cálculo cuyo origen no es obvio.

No merecen comentario: imports, getters, asignaciones, nombres descriptivos,
cualquier cosa que el tipo ya declare.

**Nunca dejar código comentado.** Para eso está el historial de git.

## Nombres

En español, consistente con el resto del proyecto. Los términos técnicos
establecidos quedan en inglés (`props`, `hook`, `build`, `commit`).

| Elemento              | Convención        | Ejemplo                   |
| --------------------- | ----------------- | ------------------------- |
| Variables y funciones | `camelCase`       | `enlacesVisibles`         |
| Componentes           | `PascalCase`      | `TarjetaServicio.astro`   |
| Constantes de módulo  | `camelCase`       | `duracionTransicion`      |
| Tipos e interfaces    | `PascalCase`      | `interface NavItem`       |
| Archivos de utilidad  | `camelCase.ts`    | `formatearFecha.ts`       |

Los booleanos empiezan con un verbo de estado: `estaAbierto`, `tieneError`,
`puedeEnviar`. Las funciones empiezan con un verbo: `obtenerPrecio()`,
`validarEmail()`.

Evitar abreviaturas salvo las universales (`id`, `url`, `src`, `props`).
`configuracion` es mejor que `cfg`; `indice` es mejor que `i` fuera de un bucle
corto.

## Funciones

Una función hace una cosa. Si al describirla aparece un "y", probablemente sean
dos funciones.

Si no entra en una pantalla, cuesta seguirla. No es una regla de líneas exactas
sino una señal: cuando una función crece, casi siempre hay una parte con nombre
propio esperando ser extraída.

Salir temprano en vez de anidar:

```ts
// mal: la lógica real queda enterrada
function procesar(datos) {
  if (datos) {
    if (datos.valido) {
      if (datos.items.length > 0) {
        return datos.items.map(transformar);
      }
    }
  }
  return [];
}

// bien: los casos borde se resuelven y se sale
function procesar(datos) {
  if (!datos?.valido) return [];
  if (datos.items.length === 0) return [];

  return datos.items.map(transformar);
}
```

## Tipos

TypeScript en `.ts` y `.tsx`. Las props de un componente siempre tipadas.

Evitar `any`. Si el tipo es genuinamente desconocido, `unknown` y se acota.

Preferir uniones de literales sobre strings sueltos: expresan las opciones
válidas y el editor las autocompleta.

```ts
// mal
size?: string;

// bien
size?: 'sm' | 'md' | 'lg';
```

## Estructura de archivos

Un componente por archivo, con el nombre del componente. El export por defecto
es el componente principal.

Orden dentro de un archivo: imports, tipos, constantes, el componente. Dentro
del frontmatter de un `.astro`: imports, props, datos derivados.

Si un archivo pasa de unas 150 líneas, revisar si hay algo con identidad propia
que merezca salir. No es un límite duro, es una señal.

## Duplicación

Repetir dos veces está bien. A la tercera, extraer.

Extraer antes de tiempo produce abstracciones que no encajan y son más caras de
deshacer que la duplicación que evitaban. Si dos fragmentos se parecen pero
cambian por motivos distintos, no son duplicación: son coincidencia.
