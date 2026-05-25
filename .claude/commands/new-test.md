# New Test

Generate a new Playwright test spec for the given feature or scenario.

Arguments: $ARGUMENTS (e.g. "UI tests for product filtering on search results page")

## Instructions

1. Determine if this is a UI test or API test based on $ARGUMENTS.
   - UI tests go in `tests/ui/`, import from `fixtures/test.fixture.ts`
   - API tests go in `tests/api/<domain>/`, import from `fixtures/api.fixture.ts`

2. Follow existing test conventions:
   - Data-driven pattern: typed case array + `for (const testCase of cases)` loop
   - Test title format: `T<N> [Feature] description of what is tested`
   - Tags: every test must have `{ tag: ['@ui'|'@api', '@regression'|'@smoke', '@P1'|'@P2'] }`
   - Use existing fixtures — never create a new browser page directly in a test

3. For UI tests:
   - Use `authHomePage` for authenticated flows
   - Use `emptyCart` fixture when cart state matters
   - All browser interactions go through Page Object methods only

4. For API tests:
   - Use `authClient`, `authCartClient`, `authCatalog` for authenticated flows
   - Assert both response status, status text, body structure, and headers

5. Run `npm run typecheck` and `npm run lint` before finishing.

Feature to test: $ARGUMENTS
