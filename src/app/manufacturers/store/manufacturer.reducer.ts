import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { IManufacturer } from '../manufacturer.model';
import {
  ManufacturerActionTypes,
  ManufacturerActions
} from './manufacturer.actions';
import { mapManufacturers } from '../manufacturers.helper';

export interface ManufacturersState extends EntityState<IManufacturer> {
  allManufacturersLoaded: boolean;
  bookmarks: number[];
}

const adapter: EntityAdapter<IManufacturer> = createEntityAdapter<
  IManufacturer
>();

const initialState: ManufacturersState = adapter.getInitialState({
  allManufacturersLoaded: false,
  bookmarks: []
});

export function manufacturerReducer(
  state = initialState,
  action: ManufacturerActions
) {
  switch (action.type) {
    case ManufacturerActionTypes.AllManufacturersLoaded: {
      const dbManufacturers = action.payload.manufacturers;
      const manufacturers = mapManufacturers(dbManufacturers);
      return adapter.addAll(manufacturers, {
        ...state,
        allManufacturersLoaded: true
      });
    }
    case ManufacturerActionTypes.ManufacturerLoaded: {
      const dbManufacturer = action.payload.manufacturer;
      const manufacturer = mapManufacturers([dbManufacturer])[0];
      return adapter.addOne(manufacturer, state);
    }
    case ManufacturerActionTypes.FilteredManufacturersLoaded: {
      const dbManufacturers = action.payload.manufacturers;
      const manufacturers = mapManufacturers(dbManufacturers);
      return adapter.addAll(manufacturers, state);
    }
    default: {
      return state;
    }
  }
}

export const { selectAll } = adapter.getSelectors();
