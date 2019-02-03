import { Action } from '@ngrx/store';
import { DbArtist } from 'src/app/shared/artist.model';

export enum ManufacturerActionTypes {
  ManufacturerRequested = '[Manufacturer Detail] Manufacturer Requested',
  ManufacturerLoaded = '[Manufacturer API] Manufacturer Loaded',
  AllManufacturersRequested = '[Manufacturers List] All Manufacturers Requested',
  AllManufacturersLoaded = '[Manufacturers API] All Manufacturers Loaded',
  FilteredManufacturersRequested = '[Manufacturers List/Detail] Filtered Manufacturers Requested',
  FilteredManufacturersLoaded = '[Manufacturers API] Filtered Manufacturers Loaded'
}

export class ManufacturerRequested implements Action {
  readonly type = ManufacturerActionTypes.ManufacturerRequested;
  constructor(public readonly payload: { manufacturerId: number }) {}
}

export class ManufacturerLoaded implements Action {
  readonly type = ManufacturerActionTypes.ManufacturerLoaded;
  constructor(public readonly payload: { manufacturer: DbArtist }) {}
}

export class AllManufacturersRequested implements Action {
  readonly type = ManufacturerActionTypes.AllManufacturersRequested;
}

export class AllManufacturersLoaded implements Action {
  readonly type = ManufacturerActionTypes.AllManufacturersLoaded;
  constructor(public readonly payload: { manufacturers: DbArtist[] }) {}
}

export class FilteredManufacturersRequested implements Action {
  readonly type = ManufacturerActionTypes.FilteredManufacturersRequested;
  constructor(public readonly payload: { filter: string }) {}
}

export class FilteredManufacturersLoaded implements Action {
  readonly type = ManufacturerActionTypes.FilteredManufacturersLoaded;
  constructor(public readonly payload: { manufacturers: DbArtist[] }) {}
}

export type ManufacturerActions =
  | ManufacturerRequested
  | ManufacturerLoaded
  | AllManufacturersRequested
  | AllManufacturersLoaded
  | FilteredManufacturersRequested
  | FilteredManufacturersLoaded;
