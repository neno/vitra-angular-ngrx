import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { IDesigner } from '../designer.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectDesignerById } from '../store/designer.selectors';
import { tap, filter, first } from 'rxjs/operators';
import { DesignerRequested } from '../store/designer.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class DesignerDetailResolver implements Resolve<IDesigner> {
  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot) {
    const designerId = +route.params['id'];
    return this.store.pipe(
      select(selectDesignerById(designerId)),
      tap((designer: IDesigner) => {
        if (!designer) {
          this.store.dispatch(new DesignerRequested({ designerId }));
        }
      }),
      filter((designer: IDesigner) => !!designer),
      first()
    );
  }
}
