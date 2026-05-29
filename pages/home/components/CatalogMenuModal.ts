import BaseComponent from '../../components/BaseComponent';
import { Locator, expect } from '@playwright/test';

export class CatalogSubMenu extends BaseComponent {
  constructor(element: Locator) {
    super(element);
  }

  async expectSectionVisible(title: string): Promise<void> {
    await expect(this.element.getByRole('link', { name: title, exact: true })).toBeVisible();
  }

  async expectItemVisible(name: string): Promise<void> {
    await expect(this.element.getByRole('link', { name, exact: true })).toBeVisible();
  }

  async clickItem(name: string): Promise<void> {
    await this.element.getByRole('link', { name, exact: true }).click();
  }
}

export class CatalogMenuModal extends BaseComponent {
  private readonly leftPane = this.element.locator('[class*="leftContainer"]');
  public readonly subMenu: CatalogSubMenu;

  constructor(element: Locator) {
    super(element);
    this.subMenu = new CatalogSubMenu(this.element.locator('[class*="rightContainer"]'));
  }

  async expectCategoryVisible(name: string): Promise<void> {
    await expect(this.leftPane.getByRole('link', { name, exact: true })).toBeVisible();
  }

  async hoverCategory(name: string): Promise<void> {
    await this.leftPane.getByRole('link', { name, exact: true }).hover();
  }

  async clickCategory(name: string): Promise<void> {
    await this.leftPane.getByRole('link', { name, exact: true }).click();
  }
}
