import { DbArtist } from '../shared/artist.model';
import { IDesigner } from './designer.model';
import { deepFind } from '../shared/utils';
import { IListItem } from '../ui/list/list-item.model';

export function mapDesigners(designers: DbArtist[]): IDesigner[] {
  return designers.map(artist => ({
    id: artist.PerId,
    name: artist.PerNameTxt,
    nameSorted: artist.PerNameSortedTxt,
    dating: artist.PerDatingTxt,
    nationality: artist.PerNationalityTxt,
    birthPlace: artist.PerBirthPlaceCity,
    birthCountry: artist.PerBirthPlaceCountry,
    displayName: artist.PerDisplay,
    productIds:
      artist.PerObjectRel && artist.PerObjectRel.map(product => product.ObjId),
    markdown: artist.PerMarkdown,
    fullText: artist.PerFullText,
    images: {
      s: deepFind(artist, 'PerMultimediaRel[0].MulUrls[0].sm'),
      m: deepFind(artist, 'PerMultimediaRel[0].MulUrls[0].me'),
      l: deepFind(artist, 'PerMultimediaRel[0].MulUrls[0].la'),
      xl: deepFind(artist, 'PerMultimediaRel[0].MulUrls[0].xl')
    },
    fulltext: artist.PerFullText
  }));
}

export function mapDesignersToListItems(designers: IDesigner[]): IListItem[] {
  return designers
    .filter(designer => !!designer)
    .map(designer => ({
      id: designer.id,
      title: designer.nameSorted,
      text: designer.dating,
      thumbnailUrl: deepFind(designer, 'images.s')
    }))
    .sort((a, b) => {
      const x = a.title.toLowerCase();
      const y = b.title.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
}
