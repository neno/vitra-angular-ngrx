import { Action } from '@ngrx/store';
import { DbProduct } from '../product.model';

export enum ProductActionTypes {
  ProductRequested = '[Product Detail] Product Requested',
  ProductLoaded = '[Products API] Product Loaded',
  AllProductsRequested = '[Products List] All Products Requested',
  AllProductsLoaded = '[Products API] All Products Loaded',
  ProductsRequestedByIds = 'Products Requested By Ids',
  ProductsLoadedByIds = 'Products Loaded By Ids',
  FilteredProductsRequested = '[Products List] Filtered Products Requested',
  FilteredProductsLoaded = '[Products API] Filtered Products Loaded',
  ToggleProductBookmark = '[Product Detail] Toggle Product Bookmark'
}

export class ProductRequested implements Action {
  readonly type = ProductActionTypes.ProductRequested;

  constructor(public readonly payload: { productId: number }) {}
}

export class ProductLoaded implements Action {
  readonly type = ProductActionTypes.ProductLoaded;

  constructor(public readonly payload: { product: DbProduct }) {}
}

export class AllProductsRequested implements Action {
  readonly type = ProductActionTypes.AllProductsRequested;
}

export class AllProductsLoaded implements Action {
  readonly type = ProductActionTypes.AllProductsLoaded;
  constructor(public readonly payload: { products: DbProduct[] }) {}
}

export class ProductsRequestedByIds implements Action {
  readonly type = ProductActionTypes.ProductsRequestedByIds;

  constructor(public readonly payload: { productIds: number[] }) {}
}

export class ProductsLoadedByIds implements Action {
  readonly type = ProductActionTypes.ProductsLoadedByIds;

  constructor(public readonly payload: { products: DbProduct[] }) {}
}

export class ToggleProductBookmark implements Action {
  readonly type = ProductActionTypes.ToggleProductBookmark;
  constructor(public readonly payload: { productId: number }) {}
}

export class FilteredProductsRequested implements Action {
  readonly type = ProductActionTypes.FilteredProductsRequested;
  constructor(public readonly payload: { filter: string }) {}
}

export class FilteredProductsLoaded implements Action {
  readonly type = ProductActionTypes.FilteredProductsLoaded;
  constructor(public readonly payload: { products: DbProduct[] }) {}
}

export type ProductActions =
  | ProductRequested
  | ProductLoaded
  | AllProductsRequested
  | AllProductsLoaded
  | ProductsRequestedByIds
  | ProductsLoadedByIds
  | ToggleProductBookmark
  | FilteredProductsRequested
  | FilteredProductsLoaded;
