import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AddEditOffreComponent } from 'src/app/freelancer/offre/add-edit-offre/add-edit-offre.component';
import { DomaineExpertise } from 'src/app/models/domaine-expertise';
import { Technologie } from 'src/app/models/technologie';
import { OffreService } from 'src/app/services/offre.service';
import { ProjetService } from 'src/app/services/projet.service';
import * as alertifyjs from 'alertifyjs';
import { NatureTravailEnum } from 'src/app/models/NatureTravail';
import { ExperienceEnum } from 'src/app/models/Experience';
@Component({
  selector: 'app-add-edit-projet',
  templateUrl: './add-edit-projet.component.html',
  styleUrls: ['./add-edit-projet.component.scss']
})
export class AddEditProjetComponent implements OnInit{

  domaineExpertiseOptions = Object.values(DomaineExpertise);
  technologieOptions = Object.values(Technologie);
  naturedetravailOptions= Object.values(NatureTravailEnum);
  experienceOptions= Object.values(ExperienceEnum);
  selectedFile!: File;
  editmode: boolean = false;
  editdata: any;
  respdata: any;
  
  id_user!: string;

  constructor(private snackBar: MatSnackBar,private formBuilder: FormBuilder, private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private projetService: ProjetService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditProjetComponent>
  )  {
    
  
    

  if (data && data.offre) {
      this.editmode = true;
      this.Reactiveform.patchValue(data.offre);
    }
  }
  Reactiveform = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    titre: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    duree: new FormControl("", Validators.required),
    budget: new FormControl("", Validators.required),
    statusProjet: new FormControl("EN_COURS", Validators.required),
    entreprise: new FormControl({ id: this.id_user }, Validators.required as any as ValidatorFn),
    technologie: new FormControl("", Validators.required),
    domaineExpertise: new FormControl("", Validators.required),
    place: new FormControl("", Validators.required),
    nombreDePostesVacants: new FormControl("",Validators.required),
    experience: new FormControl("",Validators.required),
    natureDuTravail: new FormControl("",Validators.required),
    postDate: new FormControl()
  });
  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (userData) {
      const user = JSON.parse(userData);
      this.id_user = user.id;
      this.Reactiveform.get('entreprise')?.setValue({ id: this.id_user });



      console.log(this.id_user);
    }
  }



  getReservFormData() {
    if (this.Reactiveform.valid) {
      const editid = this.Reactiveform.getRawValue().id;
      console.log(editid);
      if (editid != null && this.editmode) {
        this.addProjet();
      } else {
        this.addProjet();
      }
    } else {
      alertifyjs.error("Merci d'entrer des données valides pour La Formation");
    }
  }


  showSuccessMessage() {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duration in milliseconds
    config.horizontalPosition = 'center'; // Set the horizontal position to center
    config.verticalPosition = 'top'; // Set the vertical position to top
  
    this.snackBar.open('Formation Ajoutée!', 'Close', config);
  }



  






  imageFiles: File[] = [];
  onFileSelectedd(event: any): void {
    this.imageFiles = event.target.files;
  }

  addProjet(): void {
   
      const offerData = this.Reactiveform.value;
      offerData.postDate = new Date();
      // Call the service method to add the offer
      this.projetService.addProjet(offerData, this.imageFiles)
        .subscribe(response => {
          console.log('Projet added successfully:', response);
          if (response){
          this.showSuccessMessage();
          // Handle success, if needed
          this.dialogRef.close();
          location.reload();}
        }, error => {
          console.error('Error adding offer:', error);
          // Handle error, if needed
        });
    
  }





}
