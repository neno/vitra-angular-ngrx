import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'vitra-ui-byline',
  templateUrl: './byline.component.html',
  styleUrls: ['./byline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BylineComponent {
  @Input() text: string;
}
