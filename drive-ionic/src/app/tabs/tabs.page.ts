import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(private authSer: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSer.isLogin.subscribe((res) => {
      if (!res) {
        this.router.navigate(['/login']);
      }
    });
  }
}
