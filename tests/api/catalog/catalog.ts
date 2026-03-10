import { APIRequestContext, APIResponse} from '@playwright/test';

export class Catalog {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }  

  async searchItem(item: string): Promise<APIResponse> {
    const response = await this.request.get(`/search?query=${item}`);
    return response;
  }

  async getCategory(category: string): Promise<APIResponse> {
    const response = await this.request.get(`/${category}`);
    return response;
  }

  async getCatalog(): Promise<APIResponse> {
    const response = await this.request.get('/catalog/catalog');
    return response;
  }
}
