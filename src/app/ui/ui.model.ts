export type Language = 'de' | 'en';
export type SiteId = 'Products' | 'Designers' | 'Manufacturers';

export interface Site {
  readonly id: SiteId;
  readonly name: string;
  readonly path: string;
}

export type SiteMap = { [siteId in SiteId]: Site };

export interface Translations {
  [key: string]: string;
}
