import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Offre } from 'src/app/models/offre';
import { AuthService } from 'src/app/services/auth.service';
import { OffreService } from 'src/app/services/offre.service';
import { AddEditOffreComponent } from './add-edit-offre/add-edit-offre.component';
import * as alertifyjs from 'alertifyjs';
@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss']
})
export class OffreComponent implements OnInit{
  id_user!: number;
  ngOnInit(): void {
   

    const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
         this.id_user = user.id;  
              
      }
      this.AllOffre();
  }
  sideBarOpen = true;
  offres: Offre[] | undefined;
  editmode:boolean=false;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  constructor(private snackBar: MatSnackBar,private dialog:MatDialog,private router : Router,private http: HttpClient, private jwtHelper: JwtHelperService,private authService:AuthService,private offreService:OffreService) {}


  AllOffre(){

    this.offreService.getOffreByUserId(this.id_user).subscribe(
      (data: Offre[]) => {
        
        // Display only the first three offers
        this.offres = data;
      },
      (error) => {
        console.error('Error fetching offres:', error);
      }
    );
  }

  
  add(){
    this.editmode=false;
    this.OpenDialog('1000ms','600ms','')
   this.AllOffre();

  }

  update(id:any){
    this.editmode=true;
   this.OpenDialog('1000ms','600ms',id)
   this.AllOffre();
   

  }
  OpenDialog(enteranimation:any,exitanimation:any,id:any){
    this.dialog.open(AddEditOffreComponent,{
         enterAnimationDuration:enteranimation,
         exitAnimationDuration:exitanimation,
         width: '700px',
         data:{
          id:id,
           editmo:this.editmode,
   
         } })
   
        }



        supprimer(id:any){
    

          alertifyjs.confirm("Supprimer L'offre'","Voulez vous supprimer l'offre ?",()=>{ this.offreService.supprimerUneOffre(id).subscribe(()=>{
           this.AllOffre();
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
