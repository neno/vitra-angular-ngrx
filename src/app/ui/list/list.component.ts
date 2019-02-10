import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { IListItem } from './list-item.model';

@Component({
  selector: 'vitra-ui-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input() items: IListItem[];
  @Input() parentPath: string;

  @Output() itemSelected = new EventEmitter<number>();

  public emitItemSelected(id: number) {
    this.itemSelected.emit(id);
  }

  public itemUrl(item: IListItem) {
    if (this.parentPath) {
      return [this.parentPath, item.id];
    } else {
      return [item.id];
    }
  }
}
