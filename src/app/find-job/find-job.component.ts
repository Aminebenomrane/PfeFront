import { Component, OnInit, Renderer2 } from '@angular/core';

import { Offre } from '../models/offre';
import { OffreService } from '../services/offre.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Page } from '../models/page';
import { ProjetService } from '../services/projet.service';
import { Projet } from '../models/projet';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.component.html',
  styleUrls: ['./find-job.component.scss']
})
export class FindJobComponent implements OnInit {

  currentPage: number = 0;
  offres!: Offre[];
  projets!: Projet[];
  offresFiltres: any[] = [];
  projetsFiltres: any[] = [];
  filtreForm: any;
  type: string = 'offre'; // Default to 'offre'

  projetOffre: any;
  data!: Page<Offre>;
  totalPages: number = 0;
  isFreelanceChecked: boolean = false;
  isProjetChecked: boolean = false;
  imageUrl!: string;
  filtre: any = {
    domaineExpertise: '',
    technologie: '',
    experience: '',
    natureTravail: '',type: '',
    

    // Ajoutez d'autres propriétés nécessaires
  };
  constructor(private http: HttpClient,private router : Router,private offreService: OffreService,private renderer: Renderer2,private projetService: ProjetService,private formBuilder: FormBuilder) { 
}


onFormSubmit(formValue: any) {
  this.offresFiltres = [];
  console.log('Form submitted with values:', formValue);
  const type = this.filtre.type;

  if (type === 'offre') {
    this.http.get<any[]>('http://localhost:8080/api/v1/rechercher-offres', { params: formValue })
      .subscribe(resultats => {
        this.offresFiltres = resultats;
        console.log('Offre Search Results:', this.offresFiltres);
      });
  } else if (type === 'projet') {
    this.http.get<any[]>('http://localhost:8080/api/v1/rechercher-projets', { params: formValue })
      .subscribe(resultats => {
        this.projetsFiltres = resultats;
        console.log('Projet Search Results:', this.projetsFiltres);
      });
  }
}

  ngOnInit(): void {
    this.getTousLesOffres();
    this.getTousLesProjets();
    this.setType('offre');
    }
    setType(type: string) {
      this.filtre.type = type;
    }
  DetailsPage(id: number,type:string): void {
    this.router.navigate(['/jobDetails', id,this.filtre.type]);
  }

  onFreelanceCheckboxChange(event: any): void {
    this.isFreelanceChecked = event.target.checked;
    this.getTousLesOffres();
}

onProjetCheckboxChange(event: any): void {
  this.isProjetChecked = event.target.checked;
  this.getTousLesProjets();
}

  getTousLesOffres(): void {
    this.offreService.tousLesOffres(this.currentPage).subscribe(
      (response: any) => {
       
       

        // Assuming your array is nested under a key 'content'
        this.offres = response.content;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  rechercherOffre(){}
  rechercherProjet(){}
  getTousLesProjets(): void {
    this.projetService.tousLesProjets(this.currentPage).subscribe(
      (response: any) => {
        console.log(response);
      
        // Assuming your array is nested under a key 'content'
        this.projets = response.content;
        console.log(this.projets);
        
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  getTousLesProjetsOffres(): void {
    this.offreService.tousLesOffresProjets(this.currentPage).subscribe(
      (response: any) => {
        // Assuming your array is nested under a key 'content'
        this.projetOffre = response.content;
        this.totalPages = response.totalPages;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  


  goToNextPage(): void {
    // Increment the current page number
    this.currentPage++;

    // Fetch data for the next page
    this.getTousLesOffres();
  }
  goToPage(page: number): void {
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);

    this.currentPage = page;
    this.getTousLesOffres(); // Fetch data for the selected page
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }



  goToNextPage1(): void {
    // Increment the current page number
    this.currentPage++;

    // Fetch data for the next page
    this.getTousLesProjets();
  }
  goToPage1(page: number): void {
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);

    this.currentPage = page;
    this.getTousLesProjets(); // Fetch data for the selected page
  }

  getPageNumbers1(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}
