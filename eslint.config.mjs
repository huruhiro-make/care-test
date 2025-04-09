import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // TypeScriptの厳密な型チェック
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": "error",
      
      // React のベストプラクティス
      "react/jsx-key": "error",
      "react/self-closing-comp": "error",
      "react/no-array-index-key": "warn",
      
      // インポート関連
      "import/order": ["error", {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        "alphabetize": { "order": "asc" }
      }],
      
      // コードスタイル
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-unused-vars": "error",
      "prefer-const": "error",
      "no-duplicate-imports": "error"
    }
  }
];

export default eslintConfig;
