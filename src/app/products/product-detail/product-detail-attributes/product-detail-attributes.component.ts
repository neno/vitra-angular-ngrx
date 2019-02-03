import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IProduct } from '../../product.model';
import { Translations } from 'src/app/ui/ui.model';

@Component({
  selector: 'vitra-product-detail-attributes',
  templateUrl: './product-detail-attributes.component.html',
  styleUrls: ['./product-detail-attributes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailAttributesComponent {
  @Input() product: IProduct;
  @Input() translations: Translations;

  public showAttributes = false;

  public toggleAttributes() {
    this.showAttributes = !this.showAttributes;
  }
}
