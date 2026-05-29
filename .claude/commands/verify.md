# Verify

Run the full local verification pipeline (mirrors CI) and report results.

Arguments: $ARGUMENTS (optional: file path or test grep pattern to scope the test run)

## Instructions

Run steps in this order and stop on first failure:

1. **Typecheck**: `npx tsc --noEmit`
   - If errors: show all type errors and stop.

2. **Lint**: `npm run lint`
   - If errors: show lint errors and stop.

3. **Tests**:
   - If $ARGUMENTS is a file path → `npx playwright test <path>`
   - If $ARGUMENTS is a grep pattern → `npx playwright test --grep "<pattern>"`
   - If $ARGUMENTS is empty → `npm run test:smoke`

4. Report:
   - All steps passed → "✓ Verify passed: typecheck, lint, and tests green."
   - Any step failed → show the exact error output and name which step failed.
