// Airbnb 스타일 가이드
export default {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off", // React 17 이상부터 필요 없음
    "import/prefer-default-export": "off", // named export 선호
    "@typescript-eslint/explicit-function-return-type": "warn", // 함수 리턴 타입 권장
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // 언더바 붙인 인자 무시
    "jsx-a11y/anchor-is-valid": "off", // next/link 쓰면 anchor 규칙 꺼야 할 때가 있음
  },
  settings: {
    react: { version: "detect" },
    "import/resolver": { typescript: {} },
  },
};
