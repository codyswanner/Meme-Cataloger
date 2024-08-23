import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.browser,
        ...globals.node
      }
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {rules: {"react/prop-types": "off"}},
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {settings: {react: {version: 'detect'}}}
];
