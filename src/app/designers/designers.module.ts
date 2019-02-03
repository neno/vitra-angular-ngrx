import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignersListComponent } from './designers-list/designers-list.component';
import { StoreModule } from '@ngrx/store';
import * as fromDesigners from './store/designer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DesignerEffects } from './store/designer.effects';
import { UiModule } from '../ui/ui.module';
import { DesignersRoutingModule } from './designers-routing.module';
import { DesignerDetailComponent } from './designer-detail/designer-detail.component';
import { DesignersService } from './designers.service';

@NgModule({
  declarations: [DesignersListComponent, DesignerDetailComponent],
  imports: [
    CommonModule,
    UiModule,
    DesignersRoutingModule,
    StoreModule.forFeature('designers', fromDesigners.designerReducer),
    EffectsModule.forFeature([DesignerEffects])
  ],
  exports: [DesignersListComponent],
  providers: [DesignersService]
})
export class DesignersModule {}
