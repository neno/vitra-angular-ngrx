import {
  DbProduct,
  IProduct,
  IProductDesigner,
  IProductManufacturer,
  ObjObjectRel
} from './product.model';
import { deepFind } from '../shared/utils';
import { IListItem } from '../ui/list/list-item.model';

export function productTitle(product: DbProduct) {
  let title = '';

  if (product.ObjObjectTitleTxt && product.ObjObjectTitleTxt.trim()) {
    title = product.ObjObjectTitleTxt.trim();
  }
  if (product.ObjObjectTitleSubTxt && product.ObjObjectTitleSubTxt.trim()) {
    title = title.concat(`/${product.ObjObjectTitleSubTxt.trim()}`);
  }
  if (product.ObjDateGrp_DateFromTxt && product.ObjDateGrp_DateFromTxt.trim()) {
    if (title.length > 0) {
      title = title.concat(', ');
    }
    title = title.concat(product.ObjDateGrp_DateFromTxt.trim());
  }
  return title;
}

function getDesigner(
  people: { PerId: number; PerNameTxt: string; PerTypeVoc: string }[]
): IProductDesigner {
  if (people) {
    const designer = people.find(person => person.PerTypeVoc === 'Designer');
    if (designer) {
      return { id: designer.PerId, name: designer.PerNameTxt };
    }
  }
}

function getManufacturer(
  people: { PerId: number; PerNameTxt: string; PerTypeVoc: string }[]
): IProductManufacturer {
  if (people) {
    const manufacturer = people.find(
      person => person.PerTypeVoc === 'Produzent'
    );
    if (manufacturer) {
      return { id: manufacturer.PerId, company: manufacturer.PerNameTxt };
    }
  }
}

function getRelatedProducts(product: DbProduct): number[] {
  if (product.ObjectRelObjectsObject && product.ObjectRelObjectsObject.length) {
    return product.ObjectRelObjectsObject.map(
      (relatedProduct: ObjObjectRel) => relatedProduct.ObjId
    );
  }
}

export function mapProductsToListItems(products: IProduct[]): IListItem[] {
  return products
    .filter(product => !!product)
    .map(product => ({
      id: product.id,
      title: product.title,
      text: deepFind(product, 'designer.name'),
      thumbnailUrl: deepFind(product, 'images.s')
    }))
    .sort((a, b) => {
      const x = a.title.toLocaleLowerCase();
      const y = b.title.toLocaleLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
}

export function mapProducts(products: DbProduct[]): IProduct[] {
  return products.map(product => ({
    id: product._id,
    title: productTitle(product),
    category: product.ObjCategoryVoc,
    dateFrom: product.ObjDateFromInt,
    dateTo: product.ObjDateToInt,
    dateDesigned: product.ObjDateGrp_DateFromTxt,
    dateProduction: product.ObjDateTxt,
    dateFirstProduction: product.ObjDateGrp_Notes2Clb,
    dateFollowProduction: product.ObjDateGrp_Notes3Clb,
    material: product.ObjContentMaterial,
    dimensions: product.ObjDimension,
    inventoryNr: product.ObjObjectNumberGrp_Part1Txt,
    text: product.ObjMarkdown,
    images: {
      s: deepFind(product, 'ObjMultimediaRel[0].MulUrls[0].sm'),
      m: deepFind(product, 'ObjMultimediaRel[0].MulUrls[0].me'),
      l: deepFind(product, 'ObjMultimediaRel[0].MulUrls[0].la'),
      xl: deepFind(product, 'ObjMultimediaRel[0].MulUrls[0].xl')
    },
    designer: getDesigner(product.ObjPersonRel),
    manufacturer: getManufacturer(product.ObjPersonRel),
    relatedProductIds: getRelatedProducts(product),
    fulltext: product.ObjFullText
  }));
}

export function filterProducts(products: IProduct[], filter: string) {
  return products.filter((product: IProduct) =>
    product.fulltext.includes(filter)
  );
}
