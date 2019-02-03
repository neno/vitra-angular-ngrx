export interface IManufacturer {
  id: number;
  company: string;
  location?: string;
  country?: string;
  text?: string;
  productIds?: number[];
  fulltext: string;
}
