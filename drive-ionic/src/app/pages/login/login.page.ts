import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authSer: AuthService,
    private loadingSer: LoadingService,
    private alertSer: AlertService,
    private sharedSer: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.validations();
  }

  validations() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(this.sharedSer.emailRegex)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    let fData = this.loginForm.value;

    this.loadingSer.presentLoading('Please Wait');
    this.authSer.loginUser(fData).subscribe(
      (res) => {
        this.loadingSer.dismissLoader();
        localStorage.setItem('login_email', fData.email);
        this.authSer.isLogin.next(true);
        this.router.navigate(['/drive/folders']);
      },
      (err) => {
        this.loadingSer.dismissLoader();
        this.alertSer.presentAlert('Login', '', 'Wrong Credentials', ['Ok']);
      }
    );
  }

  // getter
  get email() {
    return this.loginForm.controls['email'] as FormArray;
  }
  get password() {
    return this.loginForm.controls['password'] as FormArray;
  }
}
