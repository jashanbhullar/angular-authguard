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
  } = {
    username: 'admin',
    password: 'password'
  } as any;

  constructor(private router: Router, private authService: AuthenticationService) {}

  login(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.authService.login(this.user).then((value: { status: boolean; message: string }) => {
      if (value.status) {
        this.router.navigate(['/']);
      } else {
        // Set error message
      }
    });
  }
}
