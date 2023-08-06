import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getErrorMessage, getLoading } from './Store/shared.selector';
import { AppState } from './Store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'store3107';
  showLoading!: Observable<boolean>;
  errorMessage!:Observable<string>;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage)
  }
}
