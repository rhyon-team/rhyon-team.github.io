/**
 * Formatea con Prettier el archivo que Claude Code acaba de escribir.
 *
 * Se ejecuta como hook PostToolUse: Claude Code pasa por stdin un JSON con los
 * datos de la herramienta, de donde sale la ruta del archivo.
 *
 * Usa la API de Prettier en vez de invocar el ejecutable. Evita levantar un
 * proceso por edición y esquiva `shell: true`, que Node marca como riesgo de
 * seguridad (DEP0190) porque no escapa los argumentos.
 *
 * Nunca falla de forma ruidosa: un error de formato no debe interrumpir el
 * trabajo, así que cualquier problema termina en salida silenciosa.
 */

import { readFile, writeFile } from 'node:fs/promises';
import prettier from 'prettier';

const rutaArchivo = await obtenerRutaDesdeStdin();
if (!rutaArchivo) process.exit(0);

try {
  const info = await prettier.getFileInfo(rutaArchivo, {
    ignorePath: '.prettierignore',
  });

  // Sin parser inferido Prettier no sabe tratar el archivo; ignorado es
  // decisión explícita del proyecto.
  if (info.ignored || !info.inferredParser) process.exit(0);

  const original = await readFile(rutaArchivo, 'utf8');
  const opciones = await prettier.resolveConfig(rutaArchivo);

  const formateado = await prettier.format(original, {
    ...opciones,
    filepath: rutaArchivo,
  });

  if (formateado !== original) {
    await writeFile(rutaArchivo, formateado, 'utf8');
  }
} catch {
  process.exit(0);
}

async function obtenerRutaDesdeStdin() {
  let datos = '';
  for await (const fragmento of process.stdin) datos += fragmento;

  try {
    return JSON.parse(datos)?.tool_input?.file_path ?? null;
  } catch {
    return null;
  }
}
