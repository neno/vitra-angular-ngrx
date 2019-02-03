import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DbProduct } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly baseUrl = '/api/products';

  constructor(private http: HttpClient) {}

  findProductById(productId: number): Observable<DbProduct> {
    return this.http.get<DbProduct>(`${this.baseUrl}/${productId}`);
  }

  findAllProducts(): Observable<DbProduct[]> {
    return this.http.get<DbProduct[]>(this.baseUrl);
  }

  findProductsByIds(productIds: number[]): Observable<DbProduct[]> {
    return this.http.get<DbProduct[]>(
      `${this.baseUrl}/?id=${productIds.join('&id=')}`
    );
  }

  findFilteredProducts(filter: string | null): Observable<DbProduct[]> {
    if (!filter) {
      return this.findAllProducts();
    }

    return this.http.get<DbProduct[]>(
      `${this.baseUrl}/?ObjFullText_like=${filter}`
    );
  }
}
