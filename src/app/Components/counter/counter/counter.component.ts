import { Component } from '@angular/core';
import { COUNTERENUMS } from 'src/app/shared/enums/enums';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  counter: number = 0;
  constructor() {}
  ngOnInit() {}

  couterEmitter(type: string) {
    switch (type) {
      case COUNTERENUMS.increment: {
        this.onIncrement();
        break;
      }
      case COUNTERENUMS.decrement: {
        this.onDecrement();
        break;
      }
      case COUNTERENUMS.reset: {
        this.onReset();
      }
    }
  }

  onIncrement() {
    this.counter++;
  }
  onDecrement() {
    this.counter--;
  }
  onReset() {
    this.counter = 0;
  }
}
