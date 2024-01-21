import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AddEditOffreComponent } from 'src/app/freelancer/offre/add-edit-offre/add-edit-offre.component';
import { Offre } from 'src/app/models/offre';
import { AuthService } from 'src/app/services/auth.service';
import { OffreService } from 'src/app/services/offre.service';
import * as alertifyjs from 'alertifyjs';
import { Projet } from 'src/app/models/projet';
import { ProjetService } from 'src/app/services/projet.service';
import { AddEditProjetComponent } from './add-edit-projet/add-edit-projet.component';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit{
  sideBarOpen = true;
  projets?: Projet[]
  editmode:boolean=false;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  id_user!: number;
  ngOnInit(): void {
   

    const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
         this.id_user = user.id;  
              
      }
      this.AllProjet();
  }
  constructor(private snackBar: MatSnackBar,private dialog:MatDialog,private router : Router,private http: HttpClient, private jwtHelper: JwtHelperService,private authService:AuthService,private projetService:ProjetService) {}


  AllProjet(){

    this.projetService.getProjetByUserId(this.id_user).subscribe(
      (data: Projet[]) => {
        
        // Display only the first three offers
        this.projets = data;
      },
      (error) => {
        console.error('Error fetching projets:', error);
      }
    );
  }

  
  add(){
    this.editmode=false;
    this.OpenDialog('1000ms','600ms','')
   this.AllProjet();

  }

  update(id:any){
    this.editmode=true;
   this.OpenDialog('1000ms','600ms',id)
   this.AllProjet();
   

  }
  OpenDialog(enteranimation:any,exitanimation:any,id:any){
    this.dialog.open(AddEditProjetComponent,{
         enterAnimationDuration:enteranimation,
         exitAnimationDuration:exitanimation,
         width: '700px',
         data:{
          id:id,
           editmo:this.editmode,
   
         } })
   
        }



        supprimer(id:any){
    

          alertifyjs.confirm("Supprimer Le Projet'","Voulez vous supprimer le projet ?",()=>{ this.projetService.supprimerUnProjet(id).subscribe(()=>{
           this.AllProjet();
           this.showSuccessMessage();
          })
        
          },function(){
        
          })
         
        }
      
      
        showSuccessMessage() {
          const config = new MatSnackBarConfig();
          config.duration = 3000; // Duration in milliseconds
          config.horizontalPosition = 'center'; // Set the horizontal position to center
          config.verticalPosition = 'top'; // Set the vertical position to top
        
          this.snackBar.open('Delete succeeded!', 'Close', config);
        }
        
        showFailMessage() {
          
          const config = new MatSnackBarConfig();
          config.duration = 3000; // Duration in milliseconds
          config.horizontalPosition = 'center'; // Set the horizontal position to center
          config.verticalPosition = 'top'; // Set the vertical position to top
        
          this.snackBar.open('Delete failed!', 'Close', config);
        }     
  
}
