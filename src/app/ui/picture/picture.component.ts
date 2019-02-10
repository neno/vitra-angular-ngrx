import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IPicture } from './picture.model';

@Component({
  selector: 'vitra-ui-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PictureComponent {
  @Input() set: IPicture[];
  @Input() defaultImageUrl: string;
  @Input() alt: string;
}
