import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProduct from './store/product.reducer';
import { ProductEffects } from './store/product.effects';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsService } from './products.service';
import { UiModule } from '../ui/ui.module';
import { ProductDetailAttributesComponent } from './product-detail/product-detail-attributes/product-detail-attributes.component';

@NgModule({
  declarations: [ProductsListComponent, ProductDetailComponent, ProductDetailAttributesComponent],
  imports: [
    CommonModule,
    UiModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', fromProduct.productReducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  providers: [ProductsService]
})
export class ProductsModule {}
