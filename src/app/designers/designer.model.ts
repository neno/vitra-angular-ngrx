import { IResponsiveImages } from '../products/product.model';

export interface IDesigner {
  id: number;
  name: string;
  nameSorted: string;
  dating: string;
  nationality: string;
  birthPlace: string;
  birthCountry: string;
  displayName: string;
  productIds: number[];
  markdown: string;
  fullText: string;
  images?: IResponsiveImages;
  fulltext: string;
}
