import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AllManufacturersRequested } from '../store/manufacturer.actions';
import { Observable } from 'rxjs';
import { IListItem } from 'src/app/ui/list/list-item.model';
import { selectManufacturerListItems } from '../store/manufacturer.selectors';
import { TranslationService } from 'src/app/translation.service';
import { Site, Translations } from 'src/app/ui/ui.model';
import {
  selectSiteById,
  selectShowNavigation
} from 'src/app/ui/store/ui.selectors';
import { ToggleNavigation } from 'src/app/ui/store/ui.actions';

@Component({
  selector: 'vitra-manufacturers-list',
  templateUrl: './manufacturers-list.component.html',
  styleUrls: ['./manufacturers-list.component.scss']
})
export class ManufacturersListComponent {
  public listItems$: Observable<IListItem[]>;
  public site: Observable<Site>;
  public translations: Observable<Translations>;
  public showNavigation$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private translationService: TranslationService
  ) {
    this.site = this.store.pipe(select(selectSiteById('Manufacturers')));
    this.store.dispatch(new AllManufacturersRequested());
    this.listItems$ = this.store.pipe(select(selectManufacturerListItems));
    this.translations = this.translationService.getTranslations();
    this.showNavigation$ = this.store.pipe(select(selectShowNavigation));
  }

  public toggleNavigation() {
    this.store.dispatch(new ToggleNavigation());
  }
}
