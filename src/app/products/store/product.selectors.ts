import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from './product.reducer';
import { ProductsState } from './product.reducer';
import { mapProductsToListItems } from '../products.helper';

export const selectProductsState = createFeatureSelector<ProductsState>(
  'products'
);

export const selectProductById = (productId: number) =>
  createSelector(
    selectProductsState,
    productsState => productsState.entities[productId]
  );

export const selectAllProducts = createSelector(
  selectProductsState,
  fromProduct.selectAll
);

export const allProductsLoadedSelector = createSelector(
  selectProductsState,
  productsState => productsState.allProductsLoaded
);

export const selectProductListItems = createSelector(
  selectAllProducts,
  products => mapProductsToListItems(products)
);
