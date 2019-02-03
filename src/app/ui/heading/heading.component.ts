import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'vitra-ui-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadingComponent {
  @Input() heading: string;
}
