import BaseComponent from '../../components/BaseComponent';
import { Locator, expect } from '@playwright/test';

export class PartleyPayOrderModal extends BaseComponent {
  private readonly modalCloseButton = this.element.getByTestId('modalClose');


  constructor(element: Locator) {
    super(element);
  }

  // --- Actions ---

  async close(): Promise<void> {
    // Modal may appear with a small delay after navigation/render.
    // Close it if it appears, but don't fail the flow if it doesn't.
    try {
      await this.element.waitFor({ state: 'visible', timeout: 5_000 });
    } catch {
      // Not visible (or not attached) within timeout -> nothing to close.
      return;
    }

    await Promise.all([
      this.element.waitFor({ state: 'hidden', timeout: 10_000 }),
      this.modalCloseButton.click(),
    ]);
  }

  // --- Getters ---



  // --- Assertions ---

  async expectVisible(): Promise<void> {
    await expect(this.element).toBeVisible();
  }

  async expectHidden(): Promise<void> {
    await expect(this.element).toBeHidden();
  }

  // --- Private helpers ---
  
}