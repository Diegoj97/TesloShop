import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPageComponent {

  constructor() {
    console.log('LoginPageComponent initialized');
  }

  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!)
      .subscribe({
        next: (success) => {
          if (success) {
            this.router.navigateByUrl('/');
          } else {
            alert('Login failed');
          }
        },
        error: () => {
          alert('Login failed');
        }
      });
  }
}
