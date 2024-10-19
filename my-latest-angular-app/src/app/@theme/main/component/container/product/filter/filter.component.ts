import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  @Input() all = 0;
  @Input() inStock = 0;
  @Input() outOfStock = 0;

  selectFilterRadioButton = 'all';

  @Output()
  filterButtonChanged = new EventEmitter<any>();

  onFilterButtonChanged() {
    this.filterButtonChanged.emit(this.selectFilterRadioButton);
  }

}
