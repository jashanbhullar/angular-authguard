import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@/services/authentication.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: {
    username: string;
    password: string;
    rememberMe: boolean;
  } = {} as any;

  constructor(private router: Router, private authService: AuthenticationService) {
    if (this.authService.checkToken) {
      this.router.navigate(['/']);
    }
  }

  login(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    // this.authService.checkToken().then(value => console.error(value));
    this.authService
      .login(this.user)
      .then((value: { status: boolean; message: string }) => {
        if (value.status) {
          this.router.navigate(['/']);
        } else {
          // Set error message
          alert('Invalid credentials');
        }
      })
      .catch(err => alert('Error occurred'));
  }
}
