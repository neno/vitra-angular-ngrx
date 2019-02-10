import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DesignersState } from './designer.reducer';
import * as fromDesigner from './designer.reducer';
import { IDesigner } from '../designer.model';
import { selectProductsState } from 'src/app/products/store/product.selectors';
import { mapProductsToListItems } from 'src/app/products/products.helper';
import { mapDesignersToListItems } from '../designers.helper';

export const selectDesignersState = createFeatureSelector<DesignersState>(
  'designers'
);

export const selectAllDesigners = createSelector(
  selectDesignersState,
  fromDesigner.selectAll
);

export const allDesignersLoadedSelector = createSelector(
  selectDesignersState,
  designersState => designersState.allDesignersLoaded
);

export const selectDesignerById = (designerId: number) =>
  createSelector(
    selectDesignersState,
    designersState => designersState.entities[designerId]
  );

export const selectDesignerListItems = createSelector(
  selectAllDesigners,
  (designers: IDesigner[]) => mapDesignersToListItems(designers)
);

export const selectDesignerProductListItemsByProductIds = (
  productIds: number[]
) =>
  createSelector(
    selectProductsState,
    productsState => {
      const products = [];
      productIds.forEach((id: number) => {
        const product = productsState.entities[id];
        if (product) {
          products.push(product);
        }
      });
      if (products.length) {
        return mapProductsToListItems(products);
      }
    }
  );
