import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../Store/app.state';
import { isAuthenticated } from '../auth/state/auth.selector';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);
  return store.select(isAuthenticated).pipe(
    map((authenticate) => {
      if (!authenticate) {
        router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    })
  );
};
