import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignersListComponent } from './designers-list/designers-list.component';
import { DesignerDetailComponent } from './designer-detail/designer-detail.component';
import { DesignerDetailResolver } from './designer-detail/designer-detail.resolver';

const routes: Routes = [
  {
    path: 'designers',
    component: DesignersListComponent
  },
  {
    path: 'designers/:id',
    component: DesignerDetailComponent,
    resolve: {
      designer: DesignerDetailResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DesignerDetailResolver]
})
export class DesignersRoutingModule {}
