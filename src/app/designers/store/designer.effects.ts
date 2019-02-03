import { Injectable } from '@angular/core';
import { map, mergeMap, withLatestFrom, filter, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Effect, ofType, Actions } from '@ngrx/effects';
import {
  DesignerRequested,
  DesignerActionTypes,
  DesignerLoaded,
  AllDesignersRequested,
  AllDesignersLoaded,
  FilteredDesignersRequested,
  FilteredDesignersLoaded
} from './designer.actions';
import { AppState } from 'src/app/reducers';
import { DbArtist } from 'src/app/shared/artist.model';
import { DesignersService } from '../designers.service';
import { allDesignersLoadedSelector } from './designer.selectors';
import { Router } from '@angular/router';

@Injectable()
export class DesignerEffects {
  @Effect()
  loadDesigner$ = this.actions$.pipe(
    ofType<DesignerRequested>(DesignerActionTypes.DesignerRequested),
    mergeMap(action =>
      this.designersService.findDesignerById(action.payload.designerId)
    ),
    map((designer: DbArtist) => new DesignerLoaded({ designer }))
  );

  @Effect()
  loadAllDesigners$ = this.actions$.pipe(
    ofType<AllDesignersRequested>(DesignerActionTypes.AllDesignersRequested),
    withLatestFrom(this.store.pipe(select(allDesignersLoadedSelector))),
    filter(([action, allDesignersLoaded]) => !allDesignersLoaded),
    mergeMap(() => this.designersService.findAllDesigners()),
    map((designers: DbArtist[]) => new AllDesignersLoaded({ designers }))
  );

  @Effect()
  loadFilteredDesigners$ = this.actions$.pipe(
    ofType<FilteredDesignersRequested>(
      DesignerActionTypes.FilteredDesignersRequested
    ),
    mergeMap(action =>
      this.designersService.findFilteredProducts(action.payload.filter)
    ),
    map((designers: DbArtist[]) => new FilteredDesignersLoaded({ designers })),
    tap(() => this.router.navigateByUrl('/designers'))
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private designersService: DesignersService,
    private router: Router
  ) {}
}
