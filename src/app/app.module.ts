import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesignersModule } from './designers/designers.module';
import { StoreModule } from '@ngrx/store';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CustomSerializer } from './shared/utils';
import { EffectsModule } from '@ngrx/effects';
import { ProductsModule } from './products/products.module';
import { MarkdownModule } from 'ngx-markdown';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { TranslationService } from './translation.service';
import { UiModule } from './ui/ui.module';
import { NavigationComponent } from './shell/navigation/navigation.component';
import { WINDOW } from './tokens';
import { LanguageSelectorComponent } from './shell/language-selector/language-selector.component';
import { SidebarComponent } from './shell/sidebar/sidebar.component';
import { LogoComponent } from './shell/logo/logo.component';
import { SearchComponent } from './shell/search/search.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LanguageSelectorComponent,
    SidebarComponent,
    LogoComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    UiModule,
    ProductsModule,
    DesignersModule,
    ManufacturersModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    { provide: WINDOW, useValue: window },
    TranslationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
