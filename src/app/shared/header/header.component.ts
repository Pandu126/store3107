import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/Store/app.state';
import { logOut } from 'src/app/auth/state/auth.actions';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated!: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.isAuthenticated = this.store.pipe(select(isAuthenticated));
    // this.isAuthenticated.subscribe((res) => console.log(res));
  }
  onLogOut(e:Event) {
    e.preventDefault();
    this.authService.logOut();
    this.store.dispatch(logOut());
  }
}
