import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ManufacturerEffects } from './store/manufacturer.effects';
import { ManufacturersService } from './manufacturers.service';
import { ManufacturersListComponent } from './manufacturers-list/manufacturers-list.component';
import { ManufacturersRoutingModule } from './manufacturers-routing.module';
import { UiModule } from '../ui/ui.module';
import { StoreModule } from '@ngrx/store';
import { manufacturerReducer } from './store/manufacturer.reducer';
import { ManufacturerDetailComponent } from './manufacturer-detail/manufacturer-detail.component';

@NgModule({
  declarations: [ManufacturersListComponent, ManufacturerDetailComponent],
  imports: [
    CommonModule,
    UiModule,
    ManufacturersRoutingModule,
    StoreModule.forFeature('manufacturers', manufacturerReducer),
    EffectsModule.forFeature([ManufacturerEffects])
  ],
  providers: [ManufacturersService]
})
export class ManufacturersModule {}
