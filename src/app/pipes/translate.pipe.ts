import { Pipe, PipeTransform } from '@angular/core';
import { Translations } from '../ui/ui.model';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  transform(translations: Translations, key: string): any {
    return translations[key] || key;
  }
}
