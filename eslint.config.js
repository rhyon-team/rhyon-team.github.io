import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';

/**
 * Configuracion de ESLint en formato flat config.
 *
 * Cubre tres lenguajes: TypeScript en src/lib, JSX en las islas de React y
 * archivos .astro. Las reglas de accesibilidad aplican a ambos tipos de
 * componente, que es donde suelen aparecer los problemas reales (botones sin
 * nombre accesible, imagenes sin alt, handlers en elementos no interactivos).
 */
export default defineConfig(
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', '*.config.mjs'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-recommended'],

  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // Islas de React
  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: { 'jsx-a11y': jsxA11y },
    rules: {
      ...jsxA11y.configs.recommended.rules,
    },
  },

  {
    rules: {
      // Permite descartar valores a proposito con el prefijo _
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
);
