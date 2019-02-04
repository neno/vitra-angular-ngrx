import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';
import { Language, Site, Translations, SiteId } from 'src/app/ui/ui.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'vitra-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  @Input() isSidebarVisible: boolean;
  @Input() searchForm: FormGroup;
  @Input() sites: Site[];
  @Input() languages: Language[];
  @Input() currentLanguage: Language;
  @Input() showResetSearchForm: boolean;
  @Input() translations: Translations;
  @Input() searchPlaceholderTranslationKey: string;
  @Input() activeSiteId: SiteId;

  @Output() changeLanguage = new EventEmitter<Language>();
  @Output() submitSearchForm = new EventEmitter<void>();
  @Output() resetSearchForm = new EventEmitter<void>();
  @Output() navigateTo = new EventEmitter<Site>();
  @Output() toggleNavigation = new EventEmitter<void>();

  public emitChangeLanguage(lang: Language) {
    this.changeLanguage.emit(lang);
  }
}
