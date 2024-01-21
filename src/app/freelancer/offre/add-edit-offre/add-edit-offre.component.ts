import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Offre } from 'src/app/models/offre';
import { OffreService } from 'src/app/services/offre.service';
import { FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { DomaineExpertise } from 'src/app/models/domaine-expertise';
import { Technologie } from 'src/app/models/technologie';
import * as alertifyjs from 'alertifyjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductImages } from 'src/app/models/product-images';
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';
import { NatureTravailEnum } from 'src/app/models/NatureTravail';
import { ExperienceEnum } from 'src/app/models/Experience';


@Component({
  selector: 'app-add-edit-offre',
  templateUrl: './add-edit-offre.component.html',
  styleUrls: ['./add-edit-offre.component.scss']
})
export class AddEditOffreComponent implements OnInit{
  
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
    private offreService: OffreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditOffreComponent>
  )  {
    
  
    

  if (data && data.offre) {
      this.editmode = true;
      this.Reactiveform.patchValue(data.offre);
    }
  }

  Reactiveform = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    prix_heure: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    freelancer: new FormControl({ id: this.id_user }, Validators.required as any as ValidatorFn),
    technologie: new FormControl("", Validators.required),
    domaineExpertise: new FormControl("", Validators.required),
    experience: new FormControl("",Validators.required),
    natureDuTravail: new FormControl("",Validators.required),
    postDate: new FormControl()
  });
  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (userData) {
      const user = JSON.parse(userData);
      this.id_user = user.id;
      this.Reactiveform.get('freelancer')?.setValue({ id: this.id_user });



      console.log(this.id_user);
    }
  }

  getReservFormData() {
    if (this.Reactiveform.valid) {
      const editid = this.Reactiveform.getRawValue().id;
      console.log(editid);
      if (editid != null && this.editmode) {
        this.addOffre();
      } else {
        this.addOffre();
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

  addOffre(): void {
   
      const offerData = this.Reactiveform.value;
      offerData.postDate = new Date();
      // Call the service method to add the offer
      this.offreService.addOffer(offerData, this.imageFiles)
        .subscribe(response => {
          console.log('Offer added successfully:', response);
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
