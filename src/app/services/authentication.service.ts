import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userLoggedIn = false;

  constructor(private http: HttpClient) {}

  get getLoginStatus() {
    return this.userLoggedIn;
  }

  login(user: any) {
    return new Promise((resolve, reject) => {
      this.http
        .post('api/login', { ...user })
        .toPromise()
        .then((value: { success: boolean; token: string; message: string }) => {
          if (value.success) {
            this.userLoggedIn = true;
            resolve({ status: true });
          } else {
            reject({ status: false, message: value.message });
            this.userLoggedIn = false;
          }
        })
        .catch(err => {
          reject({ status: false, message: 'Invalid credentials. Use "admin" and "password" ' });
        });
    });
  }
}
