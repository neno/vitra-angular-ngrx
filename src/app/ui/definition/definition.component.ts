import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IDefinitionItem } from './definition-item.model';

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefinitionComponent {
  @Input() definitions: IDefinitionItem[];
}
