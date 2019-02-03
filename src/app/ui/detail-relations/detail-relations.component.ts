import { Component, Input } from '@angular/core';
import { IListItem } from '../list/list-item.model';
import { Translations } from '../ui.model';

@Component({
  selector: 'vitra-detail-relations',
  templateUrl: './detail-relations.component.html',
  styleUrls: ['./detail-relations.component.scss']
})
export class DetailRelationsComponent {
  @Input() items: IListItem[];
  @Input() translations: Translations;
  @Input() headingTranslationKey: string;
  @Input() parentPath: string;
}
