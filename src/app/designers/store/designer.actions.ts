import { Action } from '@ngrx/store';
import { DbArtist } from 'src/app/shared/artist.model';

export enum DesignerActionTypes {
  DesignerRequested = '[Designer Detail] Designer Requested',
  DesignerLoaded = '[Designer API] Designer Loaded',
  AllDesignersRequested = '[Designers List] All Designers Requested',
  AllDesignersLoaded = '[Designers API] All Designers Loaded',
  DesignersRequestedByIds = 'Designers Requested By Ids',
  DesignersLoadedByIds = 'Designers Loaded By Ids',
  FilteredDesignersRequested = '[Designers List/Detail] Filtered Designers Requested',
  FilteredDesignersLoaded = '[Designers API] Filtered Designers Loaded'
}

export class DesignerRequested implements Action {
  readonly type = DesignerActionTypes.DesignerRequested;
  constructor(public readonly payload: { designerId: number }) {}
}

export class DesignerLoaded implements Action {
  readonly type = DesignerActionTypes.DesignerLoaded;
  constructor(public payload: { designer: DbArtist }) {}
}

export class AllDesignersRequested implements Action {
  readonly type = DesignerActionTypes.AllDesignersRequested;
}

export class AllDesignersLoaded implements Action {
  readonly type = DesignerActionTypes.AllDesignersLoaded;
  constructor(public readonly payload: { designers: DbArtist[] }) {}
}

export class DesignersRequestedByIds implements Action {
  readonly type = DesignerActionTypes.DesignersRequestedByIds;
  constructor(public readonly payload: { designerIds: number[] }) {}
}

export class DesignersLoadedByIds implements Action {
  readonly type = DesignerActionTypes.DesignersLoadedByIds;
  constructor(public readonly payload: { designers: DbArtist[] }) {}
}

export class FilteredDesignersRequested implements Action {
  readonly type = DesignerActionTypes.FilteredDesignersRequested;
  constructor(public readonly payload: { filter: string }) {}
}

export class FilteredDesignersLoaded implements Action {
  readonly type = DesignerActionTypes.FilteredDesignersLoaded;
  constructor(public readonly payload: { designers: DbArtist[] }) {}
}

export type DesignerActions =
  | DesignerRequested
  | DesignerLoaded
  | AllDesignersRequested
  | AllDesignersLoaded
  | DesignersRequestedByIds
  | DesignersLoadedByIds
  | FilteredDesignersRequested
  | FilteredDesignersLoaded;
