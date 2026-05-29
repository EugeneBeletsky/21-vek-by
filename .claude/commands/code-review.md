# Code Review

Review the current branch diff for adherence to this project's Playwright conventions.

Arguments: $ARGUMENTS (optional: specific file path to review, or empty to review all changed files)

## Instructions

1. Get the diff:
   - If $ARGUMENTS is a file path → `git diff main -- <path>`
   - Otherwise → `git diff main`

2. For each changed file, check the following rules:

### Spec files (`tests/**/*.spec.ts`)
- [ ] Every `test()` call has tags: `{ tag: ['@ui'|'@api', '@regression'|'@smoke', '@P1'|'@P2'] }`
- [ ] No raw Playwright calls (`page.click`, `page.fill`, `page.locator`, etc.) — all interactions go through Page Object methods
- [ ] Test title follows format: `T<N> [Feature] description`
- [ ] Data-driven tests use typed case arrays with `for (const testCase of cases)` loop
- [ ] Imports come from `fixtures/test.fixture.ts` (UI) or `fixtures/api.fixture.ts` (API)

### Page Object files (`pages/**/*.ts`)
- [ ] Pages extend `BasePage`, components extend `BaseComponent`
- [ ] Locators prefer `getByTestId()` > `getByRole()` > `getByLabel()` > CSS selectors
- [ ] No hashed/obfuscated CSS class names as selectors
- [ ] All actions and assertions are `async` methods
- [ ] No direct `expect()` calls in page constructors

### General
- [ ] No `console.log` (only `console.warn` is allowed)
- [ ] No `any` type unless unavoidable (and even then it should be a warning, not ignored)
- [ ] No hardcoded credentials or environment values — use `utils/config.ts`

3. Report findings:
   - List each violation with file, line number, and a one-line explanation
   - If no violations found: "No convention violations found."
   - Do not report style issues already covered by ESLint/Prettier
