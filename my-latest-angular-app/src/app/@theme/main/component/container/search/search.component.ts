import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  placeholder = "Search products...";
  inputData: string | undefined;

  @Output()
  onSearchData: EventEmitter<any> = new EventEmitter<any>();

  onInputData(event: any) {
    this.inputData = event.target.value;
    this.onSearchData.emit(this.inputData);
  }
}
