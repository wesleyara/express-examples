import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { ignores: ["node_modules/", "dist/", "build/", "coverage/", "lib/"] },
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  pluginJs.configs.recommended,
  eslintPluginPrettier,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      perfectionist,
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": "off",
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          tabWidth: 2,
          semi: true,
          trailingComma: "all",
          printWidth: 100,
          endOfLine: "auto",
          arrowParens: "avoid",
        },
      ],
      "perfectionist/sort-imports": "error",
      "perfectionist/sort-modules": "error",
      "perfectionist/sort-named-imports": "error",
      "perfectionist/sort-union-types": "error",
    },
  },
];
