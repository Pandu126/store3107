import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  autoLogin,
  logOut,
  loginFail,
  loginStart,
  loginSuccess,
  signUpStart,
  signUpSuccess,
} from './auth.actions';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
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
      ofType(...[loginStart, signUpStart]),
      exhaustMap((action) => {
        console.log(action);
        return this.authService.login(action.email, action.password).pipe(
          map((data: AuthResponseData) => {
            const user = this.authService.formatUser(data);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(
              setErrorMessage({ message: '', showloginError: false })
            );
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user, redirect: true });
          }),
          catchError((error: any) => {
            console.log(error.error.error.message);
            const errorMessage = this.authService.getErrorMessage(
              error.error.error.message
            );
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(
              setErrorMessage({ message: errorMessage, showloginError: true })
            );
          })
        );
      })
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUpStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data: AuthResponseData) => {
            const user = this.authService.formatUser(data);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(
              setErrorMessage({ message: '', showloginError: false })
            );
            this.authService.setUserInLocalStorage(user);
            return signUpSuccess({ user, redirect: true });
          }),
          catchError((error: any) => {
            console.log(error.error.message);
            const errorMessage = this.authService.getErrorMessage(
              error.error.error.message
            );
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(
              setErrorMessage({ message: errorMessage, showloginError: true })
            );
          })
        );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      exhaustMap(() => {
        const user = this.authService.getUserFromLocalStorage();
        console.log(user);
        if (user !== null) {
          return of(loginSuccess({ user, redirect: false }));
        }
        return of(loginFail);
      })
    );
  });

  logOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logOut),
        map((action) => {
          this.authService.logOut();
          this.router.navigate(['auth']);
        })
      );
    },
    { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess, signUpSuccess),
        tap((action) => {
          this.store.dispatch(
            setErrorMessage({ message: '', showloginError: false })
          );
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );
}
