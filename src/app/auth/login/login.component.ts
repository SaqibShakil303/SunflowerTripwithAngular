import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/authService/auth.service';

import { Router } from '@angular/router';
import { environment } from '../../../environments/environments.dev';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
   templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
  // template: `
  //   <div class="container">
  //     <h2>Login</h2>
  //     <form (ngSubmit)="onSubmit()">
  //       <mat-form-field>
  //         <mat-label>Email</mat-label>
  //         <input matInput [(ngModel)]="email" name="email" type="email" required>
  //       </mat-form-field>
  //       <mat-form-field>
  //         <mat-label>Password</mat-label>
  //         <input matInput [(ngModel)]="password" name="password" type="password" required>
  //       </mat-form-field>
  //       <button mat-raised-button color="primary" type="submit">Login</button>
  //     </form>
  //     <button mat-raised-button color="accent" (click)="googleLogin()">Login with Google</button>
  //     <button mat-raised-button color="accent" (click)="truecallerLogin()">Login with Truecaller</button>
  //   </div>
  // `,
  // styles: [`
  //   .container { max-width: 400px; margin: 50px auto; padding: 20px; }
  //   mat-form-field { width: 100%; margin-bottom: 20px; }
  //   button { width: 100%; margin-bottom: 10px; }
  // `]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => alert(err.message)
    });
  }

  googleLogin() {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${environment.googleClientId}&redirect_uri=${window.location.origin}/auth/google/callback&response_type=code&scope=email profile`;
  }

  truecallerLogin() {
    // window.location.href = environment.truecallerAuthUrl;
  }
}