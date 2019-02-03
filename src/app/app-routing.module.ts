import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { DesignersListComponent } from './designers/designers-list/designers-list.component';
import { ManufacturersListComponent } from './manufacturers/manufacturers-list/manufacturers-list.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'designers',
    component: DesignersListComponent
  },
  {
    path: 'manufacturers',
    component: ManufacturersListComponent
  },
  {
    path: '**',
    redirectTo: '/products'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
