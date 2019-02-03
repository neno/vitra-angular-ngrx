// export interface IProduct {
//   id: number;
//   title: string;
// }

export interface ObjContentRel {
  ConId: number;
  ConTypeUnilang: string;
  ConType: string;
  ConTxt: string;
}

export interface ObjPersonRel {
  PerId: number;
  PerNameTxt: string;
  PerDatingTxt: string;
  PerBirthPlaceCity: string;
  PerBirthPlaceCountry: string;
  PerTypeVoc: string;
  PerUrl: string;
}

export interface MulUrl {
  xl: string;
  la: string;
  ladimensions: number[];
  me: string;
  sm: string;
}

export interface ObjMultimediaRel {
  MulId: number;
  MulDefinition: string;
  MulUrl: string;
  MulUrls: MulUrl[];
}

export interface ObjObjectRel {
  ObjId: number;
  ObjObjectNumberTxt: string;
  ObjObjectNumberGrp_Part1Txt: string;
  ObjObjectTitleTxt: string;
  ObjDateGrp_DateFromTxt: string;
  ObjUrl: string;
}

export interface DbProduct {
  id?: number;
  _id: number;
  ObjId: number;
  ObjDomain: string;
  ObjObjectNumberTxt: string;
  ObjObjectTitleTxt: string;
  ObjObjectTitleSubTxt: string;
  ObjDateFromInt: number;
  ObjDateToInt: number;
  ObjDateGrp_DateFromTxt: string;
  ObjCategoryVoc: string;
  ObjDateGrp_Notes2Clb: string;
  ObjDateGrp_Notes3Clb: string;
  ObjObjectNumberGrp_Part1Txt: string;
  ObjDateTxt: string;
  ObjMaterialTechniqueTxt: string;
  ObjDimension: string;
  ObjCurrentLocationVrt: string;
  ObjContentMaterial: string;
  ObjContentType: string;
  ObjContentRel: ObjContentRel[];
  ObjDesigner: string;
  ObjPersonRel: ObjPersonRel[];
  ObjMultimediaRel: ObjMultimediaRel[];
  ObjectRelObjectsObject: ObjObjectRel[];
  ObjFullText: string;
  ObjMarkdown: string;
  isBookmarked?: boolean;
}

export interface IProductDesigner {
  id: number;
  name: string;
}

export interface IProductManufacturer {
  id: number;
  company: string;
}

export interface IResponsiveImages {
  s?: string;
  m?: string;
  l?: string;
  xl?: string;
}

export interface IProduct {
  id: number;
  title?: string;
  category?: string;
  dateFrom?: number;
  dateTo?: number;
  dateDesigned?: string;
  dateProduction?: string;
  dateFirstProduction?: string;
  dateFollowProduction?: string;
  inventoryNr?: string;
  material?: string;
  dimensions?: string;
  text?: string;
  designer?: IProductDesigner;
  manufacturer?: IProductManufacturer;
  images?: IResponsiveImages;
  relatedProductIds?: number[];
  fulltext: string;
}
