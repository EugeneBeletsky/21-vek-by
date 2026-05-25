# Run Tests

Run the specified test suite and report results.

Arguments: $ARGUMENTS (e.g. "api", "ui", "smoke", or a specific file path like "tests/ui/login.spec.ts")

## Instructions

Based on $ARGUMENTS:
- "api" → run `npm run test:api`
- "ui" → run `npm run test:ui`
- "smoke" → run `npm run test:smoke`
- "regression" → run `npm run test:regression`
- a file path → run `npx playwright test <path>`
- a test title or grep pattern → run `npx playwright test --grep "<pattern>"`

After running:
1. Report the number of passed / failed / skipped tests
2. If there are failures, show the full error messages and suggest fixes
3. If all pass, confirm which suite was run and how many tests passed
