import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vitra-sticky-header',
  templateUrl: './sticky-header.component.html',
  styleUrls: ['./sticky-header.component.scss']
})
export class StickyHeaderComponent {
  @Input() showNavigation: boolean;
  @Input() hasLinkBack: boolean;
  @Output() toggleNavigation = new EventEmitter<void>();
  @Output() goBack = new EventEmitter<void>();

  public emitToggleNavigation() {
    this.toggleNavigation.emit();
  }
}
