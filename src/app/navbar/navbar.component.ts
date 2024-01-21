import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';
import { OffreService } from '../services/offre.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  role: any;
  ngOnInit(): void {
   

    const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
         this.role = user.role;  
              
      }
     
  }
  Dashboard() {
    // Assuming you have a variable userRole that holds the user's role
    if (this.role === 'FREELANCER') {
      // Navigate to the profile page
      this.router.navigate(['/freelancer/offre']);
    } else {
      // Navigate to the home page or any other default route
      this.router.navigate(['/entreprise/projet']);
    }
  }
  constructor(private router : Router,private http: HttpClient, private jwtHelper: JwtHelperService,private authService:AuthService,private offreService:OffreService) {}

  isLoggedIn(): boolean {
    const bearerToken = localStorage.getItem('access_token');

    // Check if the bearer token exists
    if (!bearerToken) {
      return false;
    }

    try {
      // Decode the JWT to get its payload
      const tokenPayload: any = this.jwtHelper.decodeToken(bearerToken);
     
      // Additional checks on the decoded token properties
      if (tokenPayload ) {
        
        // Check if the token is not expired
       
        return tokenPayload.exp > Math.floor(Date.now() / 1000);
        
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return false;
    }
  }



  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.authService.logout().subscribe(
      () => {
        // Logout successful
      },
      (error) => {
        // Handle error
      }
    );
  }
}
