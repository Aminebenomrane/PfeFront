import { Component, OnInit } from '@angular/core';
import { DemandeRealisation } from 'src/app/models/demande-realisation';
import { DemandeProjetService } from 'src/app/services/demande-projet.service';

@Component({
  selector: 'app-demande-projet',
  templateUrl: './demande-projet.component.html',
  styleUrls: ['./demande-projet.component.scss']
})
export class DemandeProjetComponent implements OnInit{
  sideBarOpen = true;
  selectedOption: string = 'En Cours'

  demandes: DemandeRealisation[] = [];
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  constructor(private demandeService : DemandeProjetService) { }

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
    this.demandeService.findAll().subscribe(
      (data: DemandeRealisation[]) => {
       
        this.demandes = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  getDemandesEnCours() {
    this.demandeService.findAllEnCours().subscribe(
      (data: DemandeRealisation[]) => {
        console.log(data);
        this.demandes = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  getDemandesValider() {
    this.demandeService.findAllValider().subscribe(
      (data: DemandeRealisation[]) => {
        this.demandes = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  getAllDemandesAnnuler() {
    this.demandeService.findAllAnnuler().subscribe(
      (data: DemandeRealisation[]) => {
        this.demandes = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }



  validerDemande(id: number) {
    this.demandeService.validerDemandeRealisation(id).subscribe(
      (data: DemandeRealisation) => {
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
    this.demandeService.annulerDemandeRealisation(id).subscribe(
      (data: DemandeRealisation) => {
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

