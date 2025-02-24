import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import jestPlugin from "eslint-plugin-jest";
import cypressPlugin from "eslint-plugin-cypress";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react: reactPlugin,
      jest: jestPlugin,
      cypress: cypressPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        console: "readonly",
        fetch: "readonly",
        Promise: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setImmediate: "readonly",
        MessageChannel: "readonly",
        MutationObserver: "readonly",
        performance: "readonly",
        FormData: "readonly",
        AbortController: "readonly",
        queueMicrotask: "readonly",
        matchMedia: "readonly",
        reportError: "readonly",
        // Test globals
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        jest: "readonly",
        // Cypress globals
        cy: "readonly",
        Cypress: "readonly",
        // Node globals
        process: "readonly",
        __dirname: "readonly",
        // React DevTools
        __REACT_DEVTOOLS_GLOBAL_HOOK__: "readonly",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-undef": "error",
      "no-empty": "warn",
      "no-prototype-builtins": "off",
      "no-control-regex": "off",
      "no-misleading-character-class": "warn",
      "getter-return": "error",
      "valid-typeof": "error",
      "no-useless-escape": "warn",
      "no-unreachable": "warn",
      "no-cond-assign": "off", // Désactivé pour le code généré
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^(React|_)",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // Configuration spécifique pour le dossier dist
  {
    files: ["**/dist/**/*.js"],
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
      "no-prototype-builtins": "off",
      "no-control-regex": "off",
      "no-empty": "off",
      "no-constant-condition": "off",
      "no-unreachable": "off",
      "no-cond-assign": "off",
      "getter-return": "off",
      "valid-typeof": "off",
    },
  },
  // Configuration spécifique pour les fichiers de test
  {
    files: ["**/*.test.{js,jsx}", "**/*.cy.{js,jsx}"],
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
    },
  },
];
