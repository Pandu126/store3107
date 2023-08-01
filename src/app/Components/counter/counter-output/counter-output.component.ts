import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { Observable, Subscription } from 'rxjs';
import { getCounter } from '../state/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss'],
})
export class CounterOutputComponent implements OnInit {
  counter$ = this.store.select(getCounter);
  constructor(private store: Store<{ counter: CounterState }>) {}

  ngOnInit() {
  }
}
