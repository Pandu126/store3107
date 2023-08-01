import { Component, OnInit } from '@angular/core';
import { CounterState } from '../state/counter.state';
import { Store } from '@ngrx/store';
import { changeChannelName, customIncrement } from '../state/counter.actions';
import { getDummyText } from '../state/counter.selectors';
import { AppState } from 'src/app/Store/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss'],
})
export class CustomCounterInputComponent implements OnInit {
  value = 0;
  dummyText$ = this.store.select(getDummyText);
  ngOnInit() {}
  constructor(private store: Store<AppState>) {}
  onAdd() {
    this.store.dispatch(customIncrement({ value: +this.value }));
    console.log(this.value);
  }
  changeChannelName() {
    this.store.dispatch(changeChannelName());
  }
}
