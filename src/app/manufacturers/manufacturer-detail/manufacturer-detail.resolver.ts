import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { IManufacturer } from '../manufacturer.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectManufacturerById } from '../store/manufacturer.selectors';
import { tap, filter, first } from 'rxjs/operators';
import { ManufacturerRequested } from '../store/manufacturer.actions';

@Injectable()
export class ManufacturerDetailResolver implements Resolve<IManufacturer> {
  constructor(private store: Store<AppState>) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const manufacturerId = +route.params['id'];
    return this.store.pipe(
      select(selectManufacturerById(manufacturerId)),
      tap((manufacturer: IManufacturer) => {
        if (!manufacturer) {
          this.store.dispatch(new ManufacturerRequested({ manufacturerId }));
        }
      }),
      filter((manufacturer: IManufacturer) => !!manufacturer),
      first()
    );
  }
}
