// pages/components/ScrollToTopButtonComponent.ts
import BaseComponent from '../../components/BaseComponent';

export default class ScrollToTopButton extends BaseComponent {
  private buttonSelector = this.element.locator('button.style_upButton__MUSza');
  private labelSelector = this.element.locator('.style_upButtonLabel__LPAA4');

  async isVisible(): Promise<boolean> {
    return this.buttonSelector.isVisible();
  }

  async click() {
    await this.buttonSelector.click();
  }

  async getLabel(): Promise<string | null> {
    return this.labelSelector.textContent();
  }
}
