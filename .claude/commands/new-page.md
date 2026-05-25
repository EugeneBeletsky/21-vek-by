# New Page Object

Create a new Page Object class for the page at the given URL or with the given description.

Arguments: $ARGUMENTS (URL or page description, e.g. "catalog page at /catalog/tv")

## Instructions

1. Analyze the existing Page Objects in `pages/` to understand the patterns:
   - Pages extend `BasePage` from `pages/BasePage.ts`
   - Components extend `BaseComponent` from `pages/components/BaseComponent.ts`
   - Locators use `getByTestId()` when possible, otherwise stable CSS selectors
   - All actions and assertions are async methods, never raw Playwright calls in specs

2. If a URL is given, note which section of 21vek.by it corresponds to. Use the existing structure (home, search, order, payment) as reference.

3. Create the Page Object file in the appropriate `pages/<section>/` directory.

4. Create sub-component files in `pages/<section>/components/` if needed.

5. Export all new classes properly.

6. Run `npm run typecheck` and fix any TypeScript errors before finishing.

The page to create: $ARGUMENTS
