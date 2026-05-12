import { Page, expect } from '@playwright/test';
import BasePage from '../BasePage';

export type CardData = {
  number: string;
  month: string;
  year: string;
  holder: string;
  cvv: string;
  email: string;
};

export class WebpayPaymentPage extends BasePage {
  private readonly cardForm = this.page.locator('form:has(#cc_pan)');
  private readonly cardNumberInput = this.cardForm.locator('#cc_pan');
  private readonly monthInput = this.cardForm.locator('#cc_month');
  private readonly yearInput = this.cardForm.locator('#cc_year');
  private readonly holderInput = this.cardForm.locator('#cc_name');
  private readonly cvvInput = this.cardForm.locator('#cc_cvv');
  private readonly emailInput = this.cardForm.locator('#cc_email');
  private readonly payButton = this.cardForm.locator('#payBtn');

  constructor(page: Page) {
    super(page);
  }

  // --- Actions ---

  async fillCardData(card: CardData): Promise<void> {
    await this.cardNumberInput.fill(card.number);
    await this.monthInput.fill(card.month);
    await this.yearInput.fill(card.year);
    await this.holderInput.fill(card.holder);
    await this.cvvInput.fill(card.cvv);
    await this.emailInput.fill(card.email);
  }

  async returnBack(): Promise<void> {
    await this.page.goBack({ waitUntil: 'domcontentloaded' });
  }

  // --- Assertions ---

  async expectReady(): Promise<void> {
    await expect(this.page).toHaveURL(/payment\.webpay\.by/, { timeout: 30_000 });
    await expect(this.cardForm).toBeVisible();
    await expect(this.payButton).toBeVisible();
  }

  async expectCardData(card: CardData): Promise<void> {
    await expect(this.cardNumberInput).toHaveValue('4111 1111 1111 1111');
    await expect(this.monthInput).toHaveValue(card.month);
    await expect(this.yearInput).toHaveValue(card.year);
    await expect(this.holderInput).toHaveValue(card.holder);
    await expect(this.cvvInput).toHaveValue(card.cvv);
    await expect(this.emailInput).toHaveValue(card.email);
  }
}
