import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AllDesignersRequested } from '../store/designer.actions';
import { Observable } from 'rxjs';
import { IListItem } from 'src/app/ui/list/list-item.model';
import { selectDesignerListItems } from '../store/designer.selectors';
import { TranslationService } from 'src/app/translation.service';
import { Site, Translations } from 'src/app/ui/ui.model';
import {
  selectSiteById,
  selectShowNavigation
} from 'src/app/ui/store/ui.selectors';
import { ToggleNavigation } from 'src/app/ui/store/ui.actions';

@Component({
  selector: 'app-designers-list',
  templateUrl: './designers-list.component.html',
  styleUrls: ['./designers-list.component.scss']
})
export class DesignersListComponent {
  public site: Observable<Site>;
  public listItems$: Observable<IListItem[]>;
  public translations: Observable<Translations>;
  public showNavigation$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private translationService: TranslationService
  ) {
    this.site = this.store.pipe(select(selectSiteById('Designers')));
    this.store.dispatch(new AllDesignersRequested());
    this.listItems$ = this.store.pipe(select(selectDesignerListItems));
    this.showNavigation$ = this.store.pipe(select(selectShowNavigation));
    this.translations = this.translationService.getTranslations();
  }

  public toggleNavigation() {
    this.store.dispatch(new ToggleNavigation());
  }
}
