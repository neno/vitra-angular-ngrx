import { DbArtist } from '../shared/artist.model';
import { IManufacturer } from './manufacturer.model';
import { IListItem } from '../ui/list/list-item.model';
import { deepFind } from '../shared/utils';

export function getManufacturerLocationCountry(
  manufacturer: IManufacturer
): string {
  const txt = [];
  if (manufacturer.location) {
    txt.push(manufacturer.location);
  }
  if (manufacturer.country) {
    txt.push(manufacturer.country);
  }
  return txt.join(', ');
}

export function getManufacturerListText(manufacturer: IManufacturer): string {
  const txt = [];
  if (manufacturer.location) {
    txt.push(manufacturer.location);
  }
  if (manufacturer.country) {
    txt.push(manufacturer.country);
  }
  return txt.join(', ');
}

export function mapManufacturers(dbManufacturers: DbArtist[]): IManufacturer[] {
  return dbManufacturers.map(manufacturer => ({
    id: manufacturer.PerId,
    company: manufacturer.PerNameSortedTxt,
    location: manufacturer.PerBirthPlaceCity,
    country: manufacturer.PerBirthPlaceCountry,
    text: manufacturer.PerMarkdown,
    productIds:
      manufacturer.PerObjectRel &&
      manufacturer.PerObjectRel.map(product => product.ObjId),
    fulltext: manufacturer.PerFullText
  }));
}

export function mapManufacturersToListItems(
  manufacturers: IManufacturer[]
): IListItem[] {
  return manufacturers
    .filter(manufacturer => !!manufacturer)
    .map(
      (manufacturer: IManufacturer) =>
        <IListItem>{
          id: manufacturer.id,
          title: manufacturer.company,
          text: getManufacturerLocationCountry(manufacturer),
          thumbnailUrl: deepFind(manufacturer, 'images.s')
        }
    )
    .sort((a, b) => {
      const x = a.title.toLocaleLowerCase();
      const y = b.title.toLocaleLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
}
