import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Language } from 'src/app/ui/ui.model';

@Component({
  selector: 'vitra-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorComponent {
  @Input() languages: Language[];
  @Input() currentLanguage: Language;
  @Output() changeLanguage = new EventEmitter<Language>();

  public emitChangeLanguage(lang: Language) {
    this.changeLanguage.emit(lang);
  }
}
