import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailAttributesComponent } from './product-detail-attributes.component';

describe('ProductDetailAttributesComponent', () => {
  let component: ProductDetailAttributesComponent;
  let fixture: ComponentFixture<ProductDetailAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailAttributesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
