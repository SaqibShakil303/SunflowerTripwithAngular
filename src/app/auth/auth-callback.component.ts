import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';


@Component({
  selector: 'app-auth-callback',
  standalone: true,
  template: `<p>Processing authentication...</p>`
})
export class AuthCallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit() {
  //   const code = this.route.snapshot.queryParamMap.get('code');
  //   const provider = this.route.snapshot.url[0].path; // 'google' or 'truecaller'

  //   if (code) {
  //     const authMethod = provider === 'google' ? this.authService.googleAuth : this.authService.truecallerAuth;
  //     authMethod.call(this.authService, code).subscribe({
  //       next: () => this.router.navigate(['/dashboard']),
  //       error: (err) => {
  //         alert(err.message);
  //         this.router.navigate(['/login']);
  //       }
  //     });
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }
}
}