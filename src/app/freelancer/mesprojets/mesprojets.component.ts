// mesprojets.component.ts

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DemandeRealisation } from 'src/app/models/demande-realisation';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-mesprojets',
  templateUrl: './mesprojets.component.html',
  styleUrls: ['./mesprojets.component.scss']
})
export class MesprojetsComponent implements OnInit {
  id_user!: number;
  offres: any;
  projets: any[] | undefined;
  sideBarOpen = true;
  editmode = false;

  constructor(
    private service: ProjetService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.id_user = user.id;
    }
    this.AllProjets();
  }

  sideBarToggler(): void {
    this.sideBarOpen = !this.sideBarOpen;
  }
  avancement(){}
  AllProjets(): void {
    console.log('Avant la requête');
    this.service.findProjectsRealizedByFreelancerId(this.id_user).subscribe(
      data => {
        console.log('Projets chargés avec succès :', data);
        this.projets = data;
      },
      error => {
        console.error('Erreur lors du chargement des projets :', error);
      }
    );
    console.log('Après la requête');
  }

  add(): void {}

  showSuccessMessage(): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';

    this.snackBar.open('Delete succeeded!', 'Close', config);
  }

  showFailMessage(): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';

    this.snackBar.open('Delete failed!', 'Close', config);
  }
}
