import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  myControl = new FormControl();
  options: string[] = ['Walmart', 'Chedraui', 'Bodega', 'Cotsco', 'Sams', 'Coppel','Oxxo', '7Eleven'];
  filteredOptions: Observable<string[]>;

  constructor() { }

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
