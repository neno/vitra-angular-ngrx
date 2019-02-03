import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { filter, first, tap } from 'rxjs/operators';
import { ProductsService } from '../products.service';
import { IProduct } from '../product.model';
import { selectProductById } from '../store/product.selectors';
import { ProductRequested } from '../store/product.actions';

@Injectable()
export class ProductDetailResolver implements Resolve<IProduct> {
  constructor(
    private productsService: ProductsService,
    private store: Store<AppState>
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IProduct> {
    const productId = +route.params['id'];

    return this.store.pipe(
      select(selectProductById(productId)),
      tap((product: IProduct) => {
        if (!product) {
          this.store.dispatch(new ProductRequested({ productId }));
        }
      }),
      filter((product: IProduct) => !!product),
      first()
    );
  }
}
