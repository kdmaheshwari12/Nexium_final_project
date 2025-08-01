// ✅ Correct: tsconfig.json at the root
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    ...
  }
}
