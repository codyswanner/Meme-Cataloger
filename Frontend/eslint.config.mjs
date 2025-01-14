import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import stylistic from '@stylistic/eslint-plugin';

export default [
  {
    plugins: {
      '@stylistic': stylistic
    },
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
  {rules: {
    "react/prop-types": "off",
    "@stylistic/max-len": ["error", {"code": 80}]
  }},
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {settings: {react: {version: 'detect'}}}
];
