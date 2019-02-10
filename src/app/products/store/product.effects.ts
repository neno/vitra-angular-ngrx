import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  ProductActionTypes,
  ProductRequested,
  ProductLoaded,
  AllProductsRequested,
  AllProductsLoaded,
  ProductsRequestedByIds,
  ProductsLoadedByIds,
  FilteredProductsRequested
} from './product.actions';
import { mergeMap, map, withLatestFrom, filter, tap } from 'rxjs/operators';
import { ProductsService } from '../products.service';
import { DbProduct } from '../product.model';
import { select, Store } from '@ngrx/store';
import { allProductsLoadedSelector } from './product.selectors';
import { AppState } from 'src/app/reducers';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {
  @Effect()
  loadProduct$ = this.actions$.pipe(
    ofType<ProductRequested>(ProductActionTypes.ProductRequested),
    mergeMap(action =>
      this.productsService.findProductById(action.payload.productId)
    ),
    map((product: DbProduct) => new ProductLoaded({ product }))
  );

  @Effect()
  loadAllProducts = this.actions$.pipe(
    ofType<AllProductsRequested>(ProductActionTypes.AllProductsRequested),
    withLatestFrom(this.store.pipe(select(allProductsLoadedSelector))),
    filter(([_action, allProductsLoaded]) => !allProductsLoaded),
    mergeMap(() => this.productsService.findAllProducts()),
    map((products: DbProduct[]) => new AllProductsLoaded({ products }))
  );

  @Effect()
  loadProductsByIds = this.actions$.pipe(
    ofType<ProductsRequestedByIds>(ProductActionTypes.ProductsRequestedByIds),
    withLatestFrom(this.store.pipe(select(allProductsLoadedSelector))),
    filter(allProductsLoaded => !allProductsLoaded),
    mergeMap(([action, _allProductsLoaded]) =>
      this.productsService.findProductsByIds(action.payload.productIds)
    ),
    map((products: DbProduct[]) => new ProductsLoadedByIds({ products }))
  );

  @Effect()
  loadFilteredProducts = this.actions$.pipe(
    ofType<FilteredProductsRequested>(
      ProductActionTypes.FilteredProductsRequested
    ),
    mergeMap(action =>
      this.productsService.findFilteredProducts(action.payload.filter)
    ),
    map((products: DbProduct[]) => new AllProductsLoaded({ products })),
    tap(() => this.router.navigateByUrl('/products'))
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private store: Store<AppState>,
    private router: Router
  ) {}
}
