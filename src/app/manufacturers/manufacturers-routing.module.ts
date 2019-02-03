import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManufacturersListComponent } from './manufacturers-list/manufacturers-list.component';
import { ManufacturerDetailComponent } from './manufacturer-detail/manufacturer-detail.component';
import { ManufacturerDetailResolver } from './manufacturer-detail/manufacturer-detail.resolver';

const routes: Routes = [
  {
    path: 'manufacturers',
    component: ManufacturersListComponent
  },
  {
    path: 'manufacturers/:id',
    component: ManufacturerDetailComponent,
    resolve: {
      manufacturer: ManufacturerDetailResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ManufacturerDetailResolver]
})
export class ManufacturersRoutingModule {}
