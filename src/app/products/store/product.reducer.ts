import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IProduct, DbProduct } from '../product.model';
import { ProductActions, ProductActionTypes } from './product.actions';
import { mapProducts } from '../products.helper';

export interface ProductsState extends EntityState<IProduct> {
  allProductsLoaded: boolean;
  bookmarks: number[];
}

export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>();

const initialState: ProductsState = adapter.getInitialState({
  allProductsLoaded: false,
  bookmarks: []
});

export function productReducer(
  state = initialState,
  action: ProductActions
): ProductsState {
  switch (action.type) {
    case ProductActionTypes.ProductLoaded: {
      const dbProduct: DbProduct = action.payload.product;
      const product: IProduct = mapProducts([dbProduct])[0];
      return adapter.addOne(product, state);
    }
    case ProductActionTypes.AllProductsLoaded: {
      const products: IProduct[] = mapProducts(action.payload.products);
      return adapter.addAll(products, { ...state, allProductsLoaded: true });
    }
    case ProductActionTypes.FilteredProductsLoaded: {
      const products: IProduct[] = mapProducts(action.payload.products);
      return adapter.addAll(products, state);
    }
    case ProductActionTypes.ProductsLoadedByIds: {
      const products: IProduct[] = mapProducts(action.payload.products);
      return adapter.addMany(products, state);
    }
    case ProductActionTypes.ToggleProductBookmark: {
      const index: number = state.bookmarks.indexOf(action.payload.productId);
      const bookmarks: number[] = [...state.bookmarks];
      if (index > -1) {
        bookmarks.splice(index, 1);
      } else {
        bookmarks.push(action.payload.productId);
      }
      return {
        ...state,
        bookmarks
      };
    }
    default:
      return state;
  }
}

export const { selectAll } = adapter.getSelectors();
