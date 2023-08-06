import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess } from './auth.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AuthResponseData } from 'src/app/Models/AuthResponseData.model';
import { Store } from '@ngrx/store';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/Store/shared.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AutheEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        console.log(action);
        return this.authService.login(action.email, action.password).pipe(
          map((data: AuthResponseData) => {
            const user = this.authService.formatUser(data);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return loginSuccess({ user });
          }),
          catchError((error: any) => {
            console.log(error.error.error.message);
            const errorMessage = this.authService.getErrorMessage(
              error.error.error.message
            );
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
}
