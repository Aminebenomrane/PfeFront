import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwtDecode from 'jwt-decode';
import { OffreService } from '../services/offre.service';
import { Observable } from 'rxjs';
import { Offre } from '../models/offre';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit{
  constructor(private router : Router,private http: HttpClient, private jwtHelper: JwtHelperService,private authService:AuthService,private offreService:OffreService) {}
  offres: Offre[] | undefined;
  ngOnInit(): void {
    this.offreService.findAll().subscribe(
      (data: Offre[]) => {
        
        // Display only the first three offers
        this.offres = data.slice(0, 3);
      },
      (error) => {
        console.error('Error fetching offres:', error);
      }
    );
  }




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


  DetailsPage(id: number): void {
    this.router.navigate(['/jobDetails', id]);
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.authService.logout().subscribe(
      () => {console.log("ggg")
        // Logout successful
      },
      (error) => {
        // Handle error
      }
    );
  }
}