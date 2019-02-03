import { SiteId } from './ui/ui.model';

export type lang = 'en' | 'de';

export interface TranslationMap {
  [name: string]: string;
}

// export interface Translations {
//   [language in lang]: {
//     headings: TranslationMap;
//     productDetail: TranslationMap
//   }
// }
