import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/login-request';
import { AuthService } from '../services/auth.service';
import { RegisterRequest } from '../models/register-request';
import { Role } from '../models/role';
import { User } from '../models/user';
import { Country } from '../models/country';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Password condition variables
  passwordLengthValid: boolean = false;
  passwordHasUppercase: boolean = false;
  passwordHasLowercase: boolean = false;
  passwordHasNumber: boolean = false;
  passwordHasSpecialCharacter: boolean = false;

  registerRequest: RegisterRequest = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: Role.FREELANCER,
    pays: '',
    numTel: '',
    nomEntreprise: '',
    siteweb: ''
  };
  countries = Object.values(Country);
  DataResponse: any;
  loginRequest: LoginRequest = { email: '', password: '' };
  email!: string;
  isvalid: boolean = true ;
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private routes: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  showSuccessMessage() {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';

    this.snackBar.open('Registration succeeded!', 'Close', config);
  }

  showFailMessage() {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';

    this.snackBar.open('Registration failed!', 'Close', config);
  }

  loginFailMessage() {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';

    this.snackBar.open('Login failed!', 'Close', config);
  }

  login() {
    this.authService.login(this.loginRequest).subscribe(
      (response) => {
        this.DataResponse = response;
        if (this.DataResponse['access_token'] != null) {
          const accessToken = response.access_token;
          const refreshToken = response.refresh_token;
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);

          const decodedToken = this.authService.decodeToken(accessToken);

          localStorage.setItem('user_info', JSON.stringify(decodedToken));

          const user_info = localStorage.getItem('user_info');
          if (user_info !== null) {
            const userInfoObject = JSON.parse(user_info);
            this.email = userInfoObject.sub;
            console.log(this.email);
          } else {
            console.log('user_info not found in local storage');
          }

          this.authService.getUserByEmail(this.email).subscribe(
            (user: User) => {
              localStorage.setItem('user', JSON.stringify(user));

              if (user.role === 'FREELANCER') {
                this.routes.navigate(['/freelancer/chat']);
              } else {
                this.routes.navigate(['/home']);
              }

              console.log(user);
            },
            (error) => {
              console.error(error);
            }
          );
        }
      },
      (error: any) => {
        this.loginFailMessage();
        console.error('Login failed:', error);
      }
    );
  }

  register() {
    if (!this.isPasswordStrong(this.registerRequest.password)) {
      console.error('Password is not strong enough.');
      return;
    }

    this.authService.register(this.registerRequest).subscribe(
      (response: any) => {
        const accessToken = response.access_token;
        const refreshToken = response.refresh_token;
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);

        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);

        const decodedToken = this.authService.decodeToken(accessToken);
        console.log('Decoded Token:', decodedToken);

        localStorage.setItem('user_info', JSON.stringify(decodedToken));
        this.showSuccessMessage();
        window.location.reload();
      },
      (error: any) => {
        this.showFailMessage();
        console.error('Registration failed:', error);
      }
    );
  }

  onPasswordChange(password : any){
    if(password.length > 0){
      let valid = this.isPasswordStrong(password)
      if(valid) this.isvalid = true ; 
      else this.isvalid = false ; 
    }else{
      this.isvalid = true ; 
    }
    
  }
  isPasswordStrong(password: string): boolean {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumbers &&
      hasSpecialCharacters
    );
  }

  // Corrected function names
  isPasswordLengthValid(): boolean {
    return this.passwordLengthValid;
  }

  hasUppercaseLetter(): boolean {
    return this.passwordHasUppercase;
  }

  hasLowercaseLetter(): boolean {
    return this.passwordHasLowercase;
  }

  hasNumber(): boolean {
    return this.passwordHasNumber;
  }

  hasSpecialCharacter(): boolean {
    return this.passwordHasSpecialCharacter;
  }
}
