import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getErrorMessage, getLoading } from './Store/shared.selector';
import { AppState } from './Store/app.state';
import { SharedState } from './Store/shared.state';
import { autoLogin } from './auth/state/auth.actions';
import { modelwindow } from './posts/state/posts.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'store3107';
  showLoading!: Observable<boolean>;
  errorMessage!: Observable<SharedState>;
  modelwindow$!: Observable<boolean>;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
    this.modelwindow$ = this.store.pipe(select(modelwindow));
  }
}
