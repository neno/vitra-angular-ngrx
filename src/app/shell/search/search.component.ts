import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Translations } from 'src/app/ui/ui.model';

@Component({
  selector: 'vitra-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() searchForm: FormGroup;
  @Input() showResetSearchForm: boolean;
  @Input() translations: Translations;
  @Input() searchPlaceholderTranslationKey: string;

  @Output() submitSearchForm = new EventEmitter<void>();
  @Output() resetSearchForm = new EventEmitter<void>();
}
