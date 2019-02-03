import { IListItem } from './list/list-item.model';

export type Language = 'de' | 'en';
export type SiteId = 'Home' | 'Products' | 'Designers' | 'Manufacturers';

export interface Site {
  readonly id: SiteId;
  readonly name: string;
  readonly path: string;
}

export type SiteMap = { [siteId in SiteId]: Site };

export interface Translations {
  [key: string]: string;
}
