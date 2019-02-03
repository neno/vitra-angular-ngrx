import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ManufacturersState, selectAll } from './manufacturer.reducer';
import { mapManufacturersToListItems } from '../manufacturers.helper';
import { selectProductsState } from 'src/app/products/store/product.selectors';
import { IListItem } from 'src/app/ui/list/list-item.model';
import { IProduct } from 'src/app/products/product.model';
import { mapProductsToListItems } from 'src/app/products/products.helper';

export const selectManufacturersState = createFeatureSelector<
  ManufacturersState
>('manufacturers');

export const selectAllManufacturers = createSelector(
  selectManufacturersState,
  selectAll
);

export const allManufacturersLoadedSelector = createSelector(
  selectManufacturersState,
  manufacturersState => manufacturersState.allManufacturersLoaded
);

export const selectManufacturerById = (manufacturerId: number) =>
  createSelector(
    selectManufacturersState,
    manufacturersState => manufacturersState.entities[manufacturerId]
  );

export const selectManufacturerListItems = createSelector(
  selectAllManufacturers,
  manufacturers => mapManufacturersToListItems(manufacturers)
);

export const selectProductListItemsByProductIds = (productIds: number[]) =>
  createSelector(
    selectProductsState,
    productState => {
      const products: IProduct[] = [];
      productIds.forEach((id: number) => {
        const product: IProduct = productState.entities[id];
        if (product) {
          products.push(product);
        }
      });
      if (products.length) {
        return <IListItem[]>mapProductsToListItems(products);
      }
    }
  );
