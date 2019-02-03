import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Site, Translations, SiteId } from '../../ui/ui.model';

@Component({
  selector: 'vitra-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  @Input() sites: Site[];
  @Input() translations: Translations;

  @Output() navigateTo = new EventEmitter<string>();

  public emitNavigateTo(path: string) {
    this.navigateTo.emit(path);
  }
}
