import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { Injectable } from '@angular/core';
import { IResponsiveImages } from '../products/product.model';
import { IPicture } from '../ui/picture/picture.model';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

@Injectable()
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}

export function deepFind(obj: object, path: string): any {
  if (!path) {
    return obj;
  }
  return path.split('.').reduce((val, prop) => {
    try {
      if (prop.includes('[')) {
        const arr = prop.split('[');
        const index: number = parseInt(arr[1].slice(0, -1), 10);
        return val[arr[0]][index];
      } else {
        return val[prop];
      }
    } catch (error) {
      return undefined;
    }
  }, obj);
}

export function mapImageSizeToMinWidth(key) {
  switch (key) {
    case 'm':
      return 100;
    case 'l':
      return 1023;
    case 'xl':
      return 1280;
    default:
      return 0;
  }
}

export function getPictureSourceSet(imageSet: IResponsiveImages): IPicture[] {
  const srcSet = [];

  function addToSet(key: string) {
    if (key !== 's' && imageSet[key]) {
      srcSet.push({
        minWidth: mapImageSizeToMinWidth(key),
        srcset: imageSet[key]
      });
    }
  }
  // debugger;
  if (imageSet) {
    Object.keys(imageSet).forEach(key => addToSet(key));
  }

  return srcSet;
}

export function getDefaultImageUrl(imageSet: IResponsiveImages): string {
  if (!imageSet) {
    return;
  }

  let url;
  if (imageSet['l']) {
    url = imageSet['l'];
  }
  if (!url && imageSet[0]) {
    url = Object.values(imageSet)[0]['values'];
  }

  return url;
}

export function isMobile(window: Window, breakpoint = 640): boolean {
  const mq = window.matchMedia('(max-width: ' + breakpoint + 'px)');
  return mq.matches;
}
