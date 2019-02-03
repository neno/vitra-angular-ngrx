import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { IManufacturer } from '../manufacturer.model';
import { Observable } from 'rxjs';
import { selectProductListItemsByProductIds } from '../store/manufacturer.selectors';
import { IListItem } from 'src/app/ui/list/list-item.model';
import { ProductsRequestedByIds } from 'src/app/products/store/product.actions';
import { getManufacturerLocationCountry } from '../manufacturers.helper';
import { TranslationService } from 'src/app/translation.service';
import { Translations } from 'src/app/ui/ui.model';
import { selectShowNavigation } from 'src/app/ui/store/ui.selectors';
import { ToggleNavigation } from 'src/app/ui/store/ui.actions';

@Component({
  selector: 'app-manufacturer-detail',
  templateUrl: './manufacturer-detail.component.html',
  styleUrls: ['./manufacturer-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManufacturerDetailComponent {
  public manufacturer: IManufacturer;
  public productsListItems$: Observable<IListItem[]>;
  public translations$: Observable<Translations>;
  public showNavigation$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private translationService: TranslationService,
    private router: Router
  ) {
    this.manufacturer = this.route.snapshot.data['manufacturer'];
    this.translations$ = this.translationService.getTranslations();
    this.showNavigation$ = this.store.pipe(select(selectShowNavigation));

    if (this.manufacturer.productIds.length) {
      this.store.dispatch(
        new ProductsRequestedByIds({ productIds: this.manufacturer.productIds })
      );

      this.productsListItems$ = this.store.pipe(
        select(selectProductListItemsByProductIds(this.manufacturer.productIds))
      );
    }
  }

  public get locationCountry(): string {
    return getManufacturerLocationCountry(this.manufacturer);
  }

  public toggleNavigation() {
    this.store.dispatch(new ToggleNavigation());
  }

  public goToList() {
    this.router.navigate(['/manufacturers']);
  }
}
