import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { LoginForm } from '../../data/interfaces/loginForm.interface';
import { Login } from '../../data/interfaces/login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router)

  isPasswordVisible = signal<boolean>(false)

  form = new FormGroup<LoginForm>({
    username: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    password: new FormControl('', {nonNullable:true, validators: [Validators.required]}),
  });

  onSubmit() {
    if (this.form.valid) {
      const formValue: Login = this.form.getRawValue()
      
      this.authService.login(formValue).subscribe(res => {
        this.router.navigate([''])
      })
    }
  }
}
  