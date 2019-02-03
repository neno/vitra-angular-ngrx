import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { selectProductListItems } from '../store/product.selectors';
import { AllProductsRequested } from '../store/product.actions';
import { IListItem } from '../../ui/list/list-item.model';
import { TranslationService } from 'src/app/translation.service';
import {
  selectShowNavigation,
  selectSiteById
} from 'src/app/ui/store/ui.selectors';
import { ToggleNavigation } from 'src/app/ui/store/ui.actions';
import { Site, Translations } from 'src/app/ui/ui.model';

@Component({
  selector: 'vitra-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  public listItems$: Observable<IListItem[]>;
  public showNavigation$: Observable<boolean>;
  public site: Observable<Site>;
  public translations: Observable<Translations>;

  constructor(
    private store: Store<AppState>,
    private translationService: TranslationService
  ) {
    this.store.dispatch(new AllProductsRequested());
    this.listItems$ = this.store.pipe(select(selectProductListItems));
    this.showNavigation$ = this.store.pipe(select(selectShowNavigation));
    this.site = this.store.pipe(select(selectSiteById('Products')));
    this.translations = this.translationService.getTranslations();
  }

  public toggleNavigation() {
    this.store.dispatch(new ToggleNavigation());
  }
}
