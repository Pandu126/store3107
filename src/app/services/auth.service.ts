import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../Models/AuthResponseData.model';
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';
import { Store } from '@ngrx/store';
import { logOut } from '../auth/state/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;
  constructor(private http: HttpClient, private store: Store) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIBERBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
  );
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIBERBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }
  formatUser(data: AuthResponseData) {
    const expirationdate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationdate
    );
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'The email address is already in use by another account.';
      case 'OPERATION_NOT_ALLOWED':
        return 'Password sign-in is disabled for this project.';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'We have blocked all requests from this device due to unusual activity. Try again later.';
      default:
        return 'unknown error occured. Please try again';
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeOutInterval(user);
  }
  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationdate = new Date(userData.expirationdate);
      const user = new User(
        userData.email,
        userData.idToken,
        userData.idToken,
        expirationdate
      );
      this.runTimeOutInterval(user);
      return user;
    }
    return null;
  }
  runTimeOutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationdate = user.expireDate.getTime();
    const timeInterval = expirationdate - todaysDate;
    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(logOut());
    }, timeInterval);
  }
  logOut() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
