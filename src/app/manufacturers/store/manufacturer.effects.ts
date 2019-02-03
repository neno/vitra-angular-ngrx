import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import {
  AllManufacturersRequested,
  ManufacturerActionTypes,
  AllManufacturersLoaded,
  ManufacturerRequested,
  ManufacturerLoaded,
  FilteredManufacturersRequested,
  FilteredManufacturersLoaded
} from './manufacturer.actions';
import { mergeMap, map, withLatestFrom, filter, tap } from 'rxjs/operators';
import { ManufacturersService } from '../manufacturers.service';
import { DbArtist } from 'src/app/shared/artist.model';
import { allManufacturersLoadedSelector } from './manufacturer.selectors';
import { Router } from '@angular/router';

@Injectable()
export class ManufacturerEffects {
  @Effect()
  loadAllManufacturers$ = this.actions$.pipe(
    ofType<AllManufacturersRequested>(
      ManufacturerActionTypes.AllManufacturersRequested
    ),
    withLatestFrom(this.store.pipe(select(allManufacturersLoadedSelector))),
    filter(([action, allManufacturersLoaded]) => !allManufacturersLoaded),
    mergeMap(() => this.manufacturersService.findAllManufacturers()),
    map(
      (manufacturers: DbArtist[]) =>
        new AllManufacturersLoaded({ manufacturers })
    )
  );

  @Effect()
  loadManufacturer$ = this.actions$.pipe(
    ofType<ManufacturerRequested>(
      ManufacturerActionTypes.ManufacturerRequested
    ),
    mergeMap(action =>
      this.manufacturersService.findManufacturerById(
        action.payload.manufacturerId
      )
    ),
    map((manufacturer: DbArtist) => new ManufacturerLoaded({ manufacturer }))
  );

  @Effect()
  loadFilteredManufacturers$ = this.actions$.pipe(
    ofType<FilteredManufacturersRequested>(
      ManufacturerActionTypes.FilteredManufacturersRequested
    ),
    mergeMap(action =>
      this.manufacturersService.findFilteredManufacturers(action.payload.filter)
    ),
    map(
      (manufacturers: DbArtist[]) =>
        new FilteredManufacturersLoaded({ manufacturers })
    ),
    tap(() => this.router.navigateByUrl('/manufacturers'))
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private manufacturersService: ManufacturersService,
    private router: Router
  ) {}
}
