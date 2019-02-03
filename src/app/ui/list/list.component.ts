import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { IListItem } from './list-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'vitra-ui-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @Input() items: IListItem[];
  @Input() parentPath: string;

  @Output() itemSelected = new EventEmitter<number>();

  constructor(private router: Router) {}

  ngOnInit() {}

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
