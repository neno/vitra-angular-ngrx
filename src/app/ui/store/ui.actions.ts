import { Action } from '@ngrx/store';
import { Language, SiteId } from '../ui.model';

export enum UiActionTypes {
  ChangeLanguage = '[UI] Change Language',
  SetCurrentSiteId = '[UI] Set Current SiteId',
  SetMainHeading = '[UI] Set Main Heading',
  ToggleNavigation = '[UI] Toggle Navigation',
  LoadInitialData = '[UI] Load Initial Data',
  InitialDataLoaded = '[UI] Initial Data Loaded',
  IsLoading = '[UI] Is Loading',
  IsDoneLoading = '[UI] Is Done Loading',
  ActivateSite = '[UI Activate Site]'
}

export class ChangeLanguage implements Action {
  readonly type = UiActionTypes.ChangeLanguage;
  constructor(public readonly payload: { lang: Language }) {}
}

export class SetCurrentSiteId implements Action {
  readonly type = UiActionTypes.SetCurrentSiteId;
  constructor(public readonly payload: { siteId: SiteId }) {}
}

export class SetMainHeading implements Action {
  readonly type = UiActionTypes.SetMainHeading;
  constructor(public readonly payload: { heading: string }) {}
}

export class ToggleNavigation implements Action {
  readonly type = UiActionTypes.ToggleNavigation;
}

export class LoadInitialData implements Action {
  readonly type = UiActionTypes.LoadInitialData;
}

export class InitialDataLoaded implements Action {
  readonly type = UiActionTypes.InitialDataLoaded;
}

export class IsLoading implements Action {
  readonly type = UiActionTypes.IsLoading;
}

export class IsDoneLoading implements Action {
  readonly type = UiActionTypes.IsDoneLoading;
}

export class ActivateSite implements Action {
  readonly type = UiActionTypes.ActivateSite;
  constructor(public readonly payload: { siteId: SiteId }) {}
}

export type UiActions =
  | ChangeLanguage
  | SetCurrentSiteId
  | SetMainHeading
  | ToggleNavigation
  | LoadInitialData
  | InitialDataLoaded
  | IsLoading
  | IsDoneLoading
  | ActivateSite;
