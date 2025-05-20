import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/authService/auth.service';
import { ApiService } from '../../services/apiService/api.service';
import { Router } from '@angular/router';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter } from '../../../main';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  //  providers: [
  //   // recreate exactly what JwtModule.forRoot would do
  //   {
  //     provide: JWT_OPTIONS,
  //     useValue: {
  //       tokenGetter,
  //       allowedDomains: ['localhost:3000'],
  //       disallowedRoutes: []
  //     }
  //   },
  //   JwtHelperService
  // ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  email = '';
  password = '';
  role = 'user';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.signup(this.email, this.password, this.role).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => alert(err.message)
    });
  }
}
