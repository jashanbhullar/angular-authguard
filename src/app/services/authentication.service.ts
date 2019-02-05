import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const AUTH_TOKEN = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient) {}

  get getToken() {
    return this.token;
  }

  login(user: any) {
    return new Promise((resolve, reject) => {
      this.http
        .post('api/login', { ...user })
        .toPromise()
        .then((res: { success: boolean; token: string; message: string }) => {
          const { success, message, token } = res;
          if (success) {
            this.token = token;
            localStorage.setItem(AUTH_TOKEN, token);
            resolve({ status: true });
          } else {
            resolve({ status: false, message });
            this.logout();
          }
        })
        .catch(err => {
          reject({ status: false, message: 'Invalid credentials. Use "admin" and "password" ' });
          this.logout();
        });
    });
  }

  logout() {
    localStorage.removeItem(AUTH_TOKEN);
    this.token = null;
  }

  checkToken() {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (!token) {
      return Promise.resolve(false);
    }
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      this.http
        .get('api/checkToken', {
          headers
        })
        .toPromise()
        .then((res: { success: boolean }) => {
          const { success } = res;
          if (success) {
            this.token = token;
            resolve(true);
          } else {
            resolve(false);
            this.logout();
          }
        })
        .catch(err => reject('Some error occured'));
    });
  }
}
