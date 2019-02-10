import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDesigner } from '../designer.model';
import { IListItem } from 'src/app/ui/list/list-item.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectDesignerProductListItemsByProductIds } from '../store/designer.selectors';
import { ProductsRequestedByIds } from 'src/app/products/store/product.actions';
import { Translations } from 'src/app/ui/ui.model';
import { TranslationService } from 'src/app/translation.service';
import { ToggleNavigation } from 'src/app/ui/store/ui.actions';
import { selectShowNavigation } from 'src/app/ui/store/ui.selectors';

@Component({
  selector: 'vitra-designer-detail',
  templateUrl: './designer-detail.component.html',
  styleUrls: ['./designer-detail.component.scss']
})
export class DesignerDetailComponent {
  public designer: IDesigner;
  public productListItems$: Observable<IListItem[]>;
  public translations$: Observable<Translations>;
  public showNavigation$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private translationService: TranslationService,
    private router: Router
  ) {
    this.designer = this.route.snapshot.data['designer'];
    this.translations$ = this.translationService.getTranslations();
    this.showNavigation$ = this.store.pipe(select(selectShowNavigation));

    if (this.designer.productIds.length) {
      this.store.dispatch(
        new ProductsRequestedByIds({ productIds: this.designer.productIds })
      );
      this.productListItems$ = this.store.pipe(
        select(
          selectDesignerProductListItemsByProductIds(this.designer.productIds)
        )
      );
    }
  }

  public toggleNavigation() {
    this.store.dispatch(new ToggleNavigation());
  }

  public goToList() {
    this.router.navigate(['/designers']);
  }
}
