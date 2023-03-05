module.exports = {
  plugins: [
    "prettier",
    "import",
    "@typescript-eslint"
  ],
  extends: [
    "airbnb-base",
    "airbnb-typescript/base"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname,
    "sourceType": "module"
  },
  env: {
    "es6": true,
    "browser": true,
    "node": true
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "no-debugger": "off",
    "no-console": 0,
    "class-methods-use-this": "off",
    "max-classes-per-file": "off",
    "@typescript-eslint/no-unused-vars" : "off",
    "no-underscore-dangle": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/indent": "off",
    "indent": "off",
    "comma-dangle": ["error", {
      arrays: "always-multiline",
      objects: "always-multiline",
      imports: "always-multiline",
      exports: "always-multiline",
      functions: "never",
    }],
    "prettier/prettier": 0
  }
}
