import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { IProduct } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ToggleProductBookmark,
  ProductsRequestedByIds
} from '../store/product.actions';
import { IListItem } from 'src/app/ui/list/list-item.model';
import {
  selectProductListItemsByProductIds,
  selectManufacturerById
} from 'src/app/manufacturers/store/manufacturer.selectors';
import { Observable } from 'rxjs';
import { DesignerRequested } from 'src/app/designers/store/designer.actions';
import { selectDesignerById } from 'src/app/designers/store/designer.selectors';
import { IDesigner } from 'src/app/designers/designer.model';
import { mapDesignersToListItems } from 'src/app/designers/designers.helper';
import { map } from 'rxjs/operators';
import { ManufacturerRequested } from 'src/app/manufacturers/store/manufacturer.actions';
import { IManufacturer } from 'src/app/manufacturers/manufacturer.model';
import { mapManufacturersToListItems } from 'src/app/manufacturers/manufacturers.helper';
import { getDefaultImageUrl, getPictureSourceSet } from 'src/app/shared/utils';
import { IPicture } from 'src/app/ui/picture/picture.model';
import { mapProductsToListItems } from '../products.helper';
import { ToggleNavigation } from 'src/app/ui/store/ui.actions';
import { selectShowNavigation } from 'src/app/ui/store/ui.selectors';
import { Translations } from 'src/app/ui/ui.model';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'vitra-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  public product: IProduct;
  public productSummary: IListItem[];
  public relatedProductsListItems$: Observable<IListItem[]>;
  public designerListItem$: Observable<IListItem[]>;
  public manufacturerListItem$: Observable<IListItem[]>;
  public showNavigation$: Observable<boolean>;
  public translations$: Observable<Translations>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private translationService: TranslationService,
    private router: Router
  ) {
    this.product = this.route.snapshot.data['product'];

    this.getProductSummary();
    this.getRelatedProducts();
    this.getDesigner();
    this.getManufacturer();
    this.showNavigation$ = this.store.pipe(select(selectShowNavigation));
    this.translations$ = this.translationService.getTranslations();
  }

  public get pictureSourceSet(): IPicture[] {
    return this.product.images && getPictureSourceSet(this.product.images);
  }

  public get defaultImageUrl(): string {
    return getDefaultImageUrl(this.product.images);
  }

  public toggleBookmark() {
    this.store.dispatch(
      new ToggleProductBookmark({
        productId: this.product.id
      })
    );
  }

  public toggleNavigation() {
    this.store.dispatch(new ToggleNavigation());
  }

  public goToList() {
    this.router.navigate(['/products']);
  }

  private getProductSummary(): void {
    this.productSummary = mapProductsToListItems([this.product]);
  }

  private getRelatedProducts(): void {
    if (this.product.relatedProductIds) {
      this.store.dispatch(
        new ProductsRequestedByIds({
          productIds: this.product.relatedProductIds
        })
      );

      this.relatedProductsListItems$ = this.store.pipe(
        select(
          selectProductListItemsByProductIds(this.product.relatedProductIds)
        )
      );
    }
  }

  private getDesigner(): void {
    if (this.product.designer) {
      const designerId = this.product.designer.id;
      this.store.dispatch(new DesignerRequested({ designerId }));

      this.designerListItem$ = this.store.pipe(
        select(selectDesignerById(designerId)),
        map((designer: IDesigner) => mapDesignersToListItems([designer]))
      );
    }
  }

  private getManufacturer(): void {
    if (this.product.manufacturer) {
      const manufacturerId = this.product.manufacturer.id;
      this.store.dispatch(
        new ManufacturerRequested({
          manufacturerId
        })
      );

      this.manufacturerListItem$ = this.store.pipe(
        select(selectManufacturerById(manufacturerId)),
        map((manufacturer: IManufacturer) =>
          mapManufacturersToListItems([manufacturer])
        )
      );
    }
  }
}
