import { Page, expect } from '@playwright/test';
import BasePage from '../BasePage';
import { CatalogProductList } from './components/CatalogProductList';
import { CatalogFilters } from './components/CatalogFilters';
import { CatalogPagination } from './components/CatalogPagination';
import { CatalogQuickFilters } from './components/CatalogQuickFilters';
import CookieModal1 from '../home/components/CookieModal1';
import CookieModal2 from '../home/components/CookieModal2';
import { FloaterModal } from '../search/components/FloaterModal';

/**
 * Page Object for product catalog listing pages (e.g. /tv/, /notebooks/, /refrigerators/).
 *
 * The catalog page layout is the same for all categories:
 *   - A breadcrumb trail and H1 heading
 *   - A horizontal bar of quick-filter links (`quickFilters`)
 *   - A product grid (`productList`)
 *   - A filter sidebar (`filters`)
 *   - A pagination bar (`pagination`)
 *   - A "See also" related-categories block
 */
export class CatalogPage extends BasePage {
  public readonly productList: CatalogProductList;
  public readonly filters: CatalogFilters;
  public readonly pagination: CatalogPagination;
  public readonly quickFilters: CatalogQuickFilters;

  private readonly categoryHeading = this.page.getByTestId('category-name');
  private readonly breadcrumbs = this.page.getByTestId('breadcrumbs');
  private readonly relatedLinks = this.page.getByTestId('category-related-links');
  private readonly cookieModal1: CookieModal1;
  private readonly cookieModal2: CookieModal2;
  private readonly floaterModal: FloaterModal;

  constructor(page: Page) {
    super(page);
    this.productList = new CatalogProductList(page.getByTestId('product-list'));
    this.filters = new CatalogFilters(page.getByTestId('filters-block'));
    this.pagination = new CatalogPagination(page.getByTestId('pagination'));
    this.quickFilters = new CatalogQuickFilters(page.getByTestId('recipes'));
    this.cookieModal1 = new CookieModal1(page.locator('#modal-cookie'));
    this.cookieModal2 = new CookieModal2(page.getByTestId('modal'));
    this.floaterModal = new FloaterModal(page.getByTestId('floater'));
  }

  /**
   * Navigate to a catalog category by URL path, e.g. '/tv/', '/notebooks/'.
   */
  async open(path: string): Promise<void> {
    await this.goto(path);
  }

  /**
   * Dismiss site-wide overlays: cookie consent modals and the guided-tour
   * FloaterModal (react-joyride).  Safe to call when any modal is absent.
   * A 5 s window is given for the floater because it can appear after the
   * cookie modals are dismissed.
   */
  async dismissCookies(): Promise<void> {
    await this.cookieModal1.reject();
    await this.cookieModal2.reject();
    await this.floaterModal.acceptIfVisible(5_000);
  }

  /**
   * Wait until the product list is visible (i.e. results have loaded).
   * Also accepts the FloaterModal if it appears during or after load.
   */
  async waitForProducts(timeout = 30_000): Promise<void> {
    await this.productList.waitForVisible(timeout);
    await this.floaterModal.acceptIfVisible(2_000);
  }

  // --- Getters ---

  async getCategoryName(): Promise<string | null> {
    return this.categoryHeading.textContent();
  }

  // --- Assertions ---

  async expectCategoryName(name: string): Promise<void> {
    await expect(this.categoryHeading).toHaveText(name);
  }

  async expectBreadcrumbsVisible(): Promise<void> {
    await expect(this.breadcrumbs).toBeVisible();
  }

  async expectRelatedLinksVisible(): Promise<void> {
    await expect(this.relatedLinks).toBeVisible();
  }
}
