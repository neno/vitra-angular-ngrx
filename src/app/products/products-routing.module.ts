import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailResolver } from './product-detail/product-detail.resolver';
import { NgModule } from '@angular/core';

const productRoutes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    resolve: {
      product: ProductDetailResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule],
  providers: [ProductDetailResolver]
})
export class ProductsRoutingModule {}
