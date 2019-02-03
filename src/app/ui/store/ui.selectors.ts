import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from './ui.reducer';
import { Language, SiteMap, SiteId } from '../ui.model';

export const selectUiState = createFeatureSelector<UiState>('ui');

export const selectCurrentLang = createSelector(
  selectUiState,
  (uiState: UiState) => <Language>uiState.currentLang
);

export const selectSites = createSelector(
  selectUiState,
  (uiState: UiState) => <SiteMap>uiState.sites
);

export const selectSiteById = (siteId: SiteId) =>
  createSelector(
    selectUiState,
    (uiState: UiState) => {
      return uiState.sites[siteId];
    }
  );

export const selectShowNavigation = createSelector(
  selectUiState,
  (uiState: UiState) => <boolean>uiState.showNavigation
);

export const selectAvailableLanguages = createSelector(
  selectUiState,
  (uiState: UiState) => <Language[]>uiState.availableLanguages
);

export const selectInitialized = createSelector(
  selectUiState,
  (uiState: UiState) => <boolean>uiState.initialized
);
