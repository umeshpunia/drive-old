import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authSer: AuthService, private router: Router) {}

  ngOnInit(): void {
    let email = this.authSer.login;
    if (email.length > 0) {
      // alert('Login');
      this.authSer.isLogin.next(true);
      this.router.navigateByUrl('/drive/folders');
    }
  }
}
