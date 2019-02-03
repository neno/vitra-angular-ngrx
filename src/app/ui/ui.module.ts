import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { TextComponent } from './text/text.component';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { HeadingComponent } from './heading/heading.component';
import { BylineComponent } from './byline/byline.component';
import { PictureComponent } from './picture/picture.component';
import { DefinitionComponent } from './definition/definition.component';
import { StoreModule } from '@ngrx/store';
import { uiReducer } from './store/ui.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UiEffects } from './store/ui.effects';
import { LinkItemComponent } from './link-item/link-item.component';
import { IconComponent } from './icon/icon.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { StickyHeaderComponent } from './sticky-header/sticky-header.component';
import { TranslatePipe } from '../pipes/translate.pipe';
import { DetailRelationsComponent } from './detail-relations/detail-relations.component';

@NgModule({
  declarations: [
    ListComponent,
    TextComponent,
    HeadingComponent,
    BylineComponent,
    PictureComponent,
    DefinitionComponent,
    LinkItemComponent,
    IconComponent,
    StickyHeaderComponent,
    TranslatePipe,
    DetailRelationsComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    MarkdownModule.forChild(),
    RouterModule,
    StoreModule.forFeature('ui', uiReducer),
    EffectsModule.forFeature([UiEffects]),
    InlineSVGModule.forRoot()
  ],
  exports: [
    ListComponent,
    TextComponent,
    HeadingComponent,
    BylineComponent,
    PictureComponent,
    DefinitionComponent,
    IconComponent,
    StickyHeaderComponent,
    TranslatePipe,
    DetailRelationsComponent
  ]
})
export class UiModule {}
