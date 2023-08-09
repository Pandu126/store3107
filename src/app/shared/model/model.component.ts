import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent {
constructor(private store:Store){}
}
