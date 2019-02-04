import { Component, Inject, OnDestroy } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { WINDOW } from './tokens';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { Observable, Subscription, BehaviorSubject, Subject } from 'rxjs';
import {
  selectShowNavigation,
  selectCurrentLang,
  selectAvailableLanguages,
  selectSites,
  selectActiveSiteId
} from './ui/store/ui.selectors';
import {
  ToggleNavigation,
  ChangeLanguage,
  InitialDataLoaded,
  ActivateSite
} from './ui/store/ui.actions';
import { Language, Site, SiteMap, Translations, SiteId } from './ui/ui.model';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { FilteredProductsRequested } from './products/store/product.actions';
import { FilteredDesignersRequested } from './designers/store/designer.actions';
import { FilteredManufacturersRequested } from './manufacturers/store/manufacturer.actions';
import { TranslationService } from './translation.service';
import { isMobile } from './shared/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public showNavigation: Observable<boolean>;
  public sites: Observable<Site[]>;
  public languages: Observable<Language[]>;
  public currentLanguage: Observable<Language>;
  public searchForm: FormGroup;
  public translations: Observable<Translations>;
  public showResetSearchForm = new BehaviorSubject(false);
  public activeSiteId: Observable<SiteId>;
  public searchPlaceholderTranslationKey = new BehaviorSubject(
    'search.placeholder'
  );

  private activeComponent: string;
  private searchFormSubscription: Subscription;
  private activeSiteIdSubscription: Subscription;

  constructor(
    @Inject(WINDOW) private window: Window,
    private store: Store<AppState>,
    private translationService: TranslationService,
    private router: Router
  ) {
    // Todo: initial data load should be dispatched with an action
    this.translationService.setTranslations('de');
    this.store.dispatch(new InitialDataLoaded());

    this.showNavigation = this.store.pipe(select(selectShowNavigation));
    this.currentLanguage = this.store.pipe(select(selectCurrentLang));
    this.languages = this.store.pipe(select(selectAvailableLanguages));
    this.translations = this.translationService.getTranslations();

    this.sites = this.store.pipe(
      select(selectSites),
      map((sites: SiteMap) => Object.values(sites))
    );

    this.searchForm = new FormGroup({
      searchString: new FormControl(null)
    });

    this.activeSiteId = this.store.pipe(select(selectActiveSiteId));
    this.activeSiteIdSubscription = this.activeSiteId.subscribe(
      (siteId: SiteId) => this.setSearchPlaceholderTranslationKey(siteId)
    );
    this.observeSearchFormChanges();
  }

  ngOnDestroy() {
    this.searchFormSubscription.unsubscribe();
    this.activeSiteIdSubscription.unsubscribe();
    this.showResetSearchForm.complete();
  }

  public onActivate(e: RouterEvent): void {
    this.activeComponent = e.constructor.name;
    if (this.activeComponent.includes('Detail')) {
      this.scrollToTop();
    }
  }

  public navigateTo(site: Site) {
    this.store.dispatch(new ActivateSite({ siteId: site.id }));
    this.resetSearchForm();
    this.router.navigate([site.path]);

    this.scrollToTop();
    if (isMobile(this.window)) {
      this.toggleNavigation();
    }
  }

  public toggleNavigation() {
    this.store.dispatch(new ToggleNavigation());
  }

  public changeLanguage(lang: Language) {
    this.store.dispatch(new ChangeLanguage({ lang }));
  }

  public submitSearchForm() {
    this.filterDataAccordingToActiveComponent(
      this.searchForm.get('searchString').value
    );
    if (isMobile(this.window)) {
      this.toggleNavigation();
    }
  }

  public resetSearchForm() {
    this.searchForm.reset();
  }

  private observeSearchFormChanges() {
    this.searchFormSubscription = this.searchForm
      .get('searchString')
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((val: string) => {
        this.filterDataAccordingToActiveComponent(val);
        this.showResetSearchForm.next(!!val);
      });
  }

  private filterDataAccordingToActiveComponent(filter: string) {
    // only filter if there is a query string (>2) or if it is reset
    if ((filter && filter.length > 2) || !filter) {
      if (this.activeComponent.includes('Product')) {
        this.store.dispatch(new FilteredProductsRequested({ filter }));
      }
      if (this.activeComponent.includes('Designer')) {
        this.store.dispatch(new FilteredDesignersRequested({ filter }));
      }
      if (this.activeComponent.includes('Manufacturer')) {
        this.store.dispatch(new FilteredManufacturersRequested({ filter }));
      }
    }
  }

  private scrollToTop() {
    this.window.scroll(0, 0);
  }

  private setSearchPlaceholderTranslationKey(siteId: SiteId) {
    if (siteId === 'Products') {
      this.searchPlaceholderTranslationKey.next('searchProducts.placeholder');
    }
    if (siteId === 'Designers') {
      this.searchPlaceholderTranslationKey.next('searchDesigners.placeholder');
    }
    if (siteId === 'Manufacturers') {
      this.searchPlaceholderTranslationKey.next(
        'searchManufacturers.placeholder'
      );
    }
  }
}
