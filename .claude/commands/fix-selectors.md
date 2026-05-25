# Fix Broken Selectors

Analyze failing tests caused by changed selectors and fix them.

Arguments: $ARGUMENTS (test output with errors, or file path to broken spec/page object)

## Instructions

1. Read the test error or the file at $ARGUMENTS.
2. Identify which selectors are broken (CSS classes that look like hashed CSS Modules names are especially fragile).
3. For each broken selector:
   - Prefer `getByTestId()` if the element has a `data-testid` attribute
   - Prefer `getByRole()`, `getByLabel()`, `getByText()` for semantic elements
   - Only use CSS selectors as last resort, and prefer structural ones over hashed class names
4. Update the Page Object or Component file (not the spec file directly).
5. Run `npm run typecheck` to verify no TypeScript errors.
6. Run the affected test with `npx playwright test <file>` to confirm the fix.
