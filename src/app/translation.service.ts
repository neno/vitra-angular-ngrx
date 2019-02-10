import { Injectable } from '@angular/core';
import locales from './locales';
import { deepFind } from './shared/utils';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { selectCurrentLang } from './ui/store/ui.selectors';
import { map } from 'rxjs/operators';
import { Language, Translations } from './ui/ui.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any;

  constructor(private store: Store<AppState>) {}

  public getTranslation(key: string): Observable<string> {
    return this.store.pipe(
      select(selectCurrentLang),
      map((currentLang: Language) => deepFind(locales, `${currentLang}.${key}`))
    );
  }

  public translate(key: string): string {
    const t = this.translations[key];
    return t || key;
  }

  public getTranslations(): Observable<Translations> {
    return this.store.pipe(
      select(selectCurrentLang),
      map((currentLang: Language) => locales[currentLang])
    );
  }

  public setTranslations(lang: Language) {
    this.translations = locales[lang];
  }
}
