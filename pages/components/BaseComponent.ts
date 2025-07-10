import { Locator } from '@playwright/test';

export default class BaseComponent {
  protected readonly element: Locator;

  constructor(element: Locator) {
    this.element = element;
  }
} 