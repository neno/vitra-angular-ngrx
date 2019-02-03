import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'vitra-ui-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent {
  @Input() text: string;
}
