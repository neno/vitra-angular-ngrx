import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { TranslationService } from 'src/app/translation.service';
import { UiActionTypes, ChangeLanguage } from './ui.actions';

@Injectable()
export class UiEffects {
  @Effect({ dispatch: false })
  changeLanguage = this.actions$.pipe(
    ofType<ChangeLanguage>(UiActionTypes.ChangeLanguage),
    tap(action => this.translationService.setTranslations(action.payload.lang))
  );

  constructor(
    private actions$: Actions,
    private translationService: TranslationService
  ) {}
}
