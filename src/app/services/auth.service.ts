import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../Models/AuthResponseData.model';
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIBERBASE_API_KEY}`,
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
      default:
        return 'unknown error occured. Please try again';
    }
  }
}
