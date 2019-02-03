import { Language, SiteMap, SiteId } from '../ui.model';
import { UiActions, UiActionTypes } from './ui.actions';
import { IListItem } from '../list/list-item.model';

export interface UiState {
  initialized: boolean;
  isLoading: boolean;
  currentLang: Language;
  availableLanguages: Language[];
  sites: SiteMap;
  showNavigation: boolean;
}

const initialState: UiState = {
  initialized: false,
  isLoading: false,
  currentLang: 'en',
  availableLanguages: ['de', 'en'],
  sites: {
    Home: {
      id: 'Home',
      name: 'headings.home',
      path: '/'
    },
    Products: {
      id: 'Products',
      name: 'headings.products',
      path: '/products'
    },
    Designers: {
      id: 'Designers',
      name: 'headings.designers',
      path: '/designers'
    },
    Manufacturers: {
      id: 'Manufacturers',
      name: 'headings.manufacturers',
      path: '/manufacturers'
    }
  },
  showNavigation: true
};

export function uiReducer(state = initialState, action: UiActions) {
  switch (action.type) {
    case UiActionTypes.InitialDataLoaded: {
      return { ...state, initialized: true };
      // return state;
    }
    case UiActionTypes.ChangeLanguage: {
      if (action.payload.lang !== state.currentLang) {
        return { ...state, currentLang: action.payload.lang };
      } else {
        return state;
      }
    }
    case UiActionTypes.ToggleNavigation:
      return { ...state, showNavigation: !state.showNavigation };
    case UiActionTypes.ChangeLanguage:
      return { ...state, currentLang: action.payload.lang };
    case UiActionTypes.IsLoading:
      return { ...state, isLoading: true };
    case UiActionTypes.IsDoneLoading:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
