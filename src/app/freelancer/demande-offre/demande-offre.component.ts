import { Component, OnInit } from '@angular/core';
import { DemandeRecrutement } from 'src/app/models/demande-recrutement';
import { DemandeRecrutementService } from 'src/app/services/demande-offre.service';

@Component({
  selector: 'app-demande-offre',
  templateUrl: './demande-offre.component.html',
  styleUrls: ['./demande-offre.component.scss']
})
export class DemandeOffreComponent implements OnInit {
  sideBarOpen = true;
  selectedOption: string = 'En Cours'

  demandes: DemandeRecrutement[] = [];
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  constructor(private demandeRecrutementService : DemandeRecrutementService) { }

  ngOnInit(): void {
    if (this.selectedOption === 'Valider') {
      this.getDemandesValider();
    }else if (this.selectedOption === 'Annuler') {
     this.getAllDemandesAnnuler();
    } else if (this.selectedOption === 'En Cours') {
      this.getDemandesEnCours();
    }
  }
  getAllDemandes() {
    this.demandeRecrutementService.findAll().subscribe(
      (data: DemandeRecrutement[]) => {
       
        this.demandes = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  getDemandesEnCours() {
    this.demandeRecrutementService.findAllEnCours().subscribe(
      (data: DemandeRecrutement[]) => {
        console.log(data);
        this.demandes = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  getDemandesValider() {
    this.demandeRecrutementService.findAllValider().subscribe(
      (data: DemandeRecrutement[]) => {
        this.demandes = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  getAllDemandesAnnuler() {
    this.demandeRecrutementService.findAllAnnuler().subscribe(
      (data: DemandeRecrutement[]) => {
        this.demandes = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }



  validerDemande(id: number) {
    this.demandeRecrutementService.validerDemandeRecrutement(id).subscribe(
      (data: DemandeRecrutement) => {
        // Handle success, e.g., update the UI or perform additional actions
        console.log('Demande validée:', data);
        this.getDemandesEnCours(); // Refresh the data after validation
      },
      (error) => {
        console.error('Error validating demande:', error);
      }
    );
  }

  annulerDemande(id: number) {
    this.demandeRecrutementService.annulerDemandeRecrutement(id).subscribe(
      (data: DemandeRecrutement) => {
        // Handle success, e.g., update the UI or perform additional actions
        console.log('Demande annulée:', data);
        this.getDemandesEnCours(); // Refresh the data after cancellation
      },
      (error) => {
        console.error('Error cancelling demande:', error);
      }
    );
  }


  onRadioChange() {
    if (this.selectedOption === 'Valider') {
      this.getDemandesValider();
    }else if (this.selectedOption === 'Annuler') {
     this.getAllDemandesAnnuler();
    } else if (this.selectedOption === 'En Cours') {
      this.getDemandesEnCours();
    }
  }
}
