interface SyncDate {
  $date: Date;
}

interface PerMutationDate {
  $date: Date;
}

interface PerObjectRel {
  ObjId: number;
  ObjObjectNumberTxt: string;
  ObjObjectNumberGrp_Part1Txt: string;
  ObjObjectTitleTxt: string;
  ObjDesigner: string;
  ObjDateGrp_DateFromTxt: string;
  ObjUrl: string;
}

export type ArtistType = 'Designer' | 'Produzent';

export interface DbArtist {
  _id: number;
  SyncDate: SyncDate;
  PerId: number;
  PerMutationDate: PerMutationDate;
  PerDomain: string;
  PerTypeVoc: ArtistType;
  PerNameTxt: string;
  PerNameSortedTxt: string;
  PerDatingTxt: string;
  PerNationalityTxt: string;
  PerBirthPlaceCity: string;
  PerBirthPlaceCountry: string;
  PerDisplay: string;
  PerObjectRel: PerObjectRel[];
  PerMarkdown: string;
  PerFullText: string;
}
