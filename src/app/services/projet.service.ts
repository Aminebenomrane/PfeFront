import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet';
import { Offre } from '../models/offre';
import { OffreService } from './offre.service';
import { AuthService } from './auth.service';
import { DemandeRealisation } from '../models/demande-realisation';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private apiRoot = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient, private authService: AuthService) {}
  findProjectsRealizedByFreelancerId(idFreelancer: number): Observable<Projet[]> {
    const url = `${this.apiRoot}/demandeF/projets-realises/${idFreelancer}`;
    return this.http.get<Projet[]>(url);
  }
  
  updateUnProjet(projet: Projet, id: number): Observable<Projet> {
    const formData = new FormData();
    formData.append('projet', JSON.stringify(projet));

    return this.http.put<Projet>(`${this.apiRoot}/proj/${id}`, formData);
  }

  supprimerUnProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiRoot}/proj/${id}`);
  }

  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiRoot}/proj/${id}`);
  }

  tousLesProjets(page: number = 0, size: number = 10): Observable<Projet[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Projet[]>(`${this.apiRoot}/proj/pagination/All`, { params });
  }


  rechercherProjetsParDomaineEtTechnologie(domaine: string, technologie: string): Observable<any> {
    return this.http.get(`${this.apiRoot}/proj/recherche/${domaine}/${technologie}`);
  }


  findAll(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiRoot}/proj/All`);
  }

  getProjetByUserId(id: number): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiRoot}/proj/user/${id}`);
  }



  addProjet(projet: any, imageFiles: File[]): Observable<any> {
    const formData: FormData = new FormData();

    // Append offer data as a JSON string
    formData.append(
      'projet',
      new Blob([JSON.stringify(projet)], { type: 'application/json' }))

    // Append each image file
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('imageFile', imageFiles[i], imageFiles[i].name);
    }

    const headers = new HttpHeaders();
    // Note: Do not set the Content-Type header; HttpClient will set it automatically for FormData.

    return this.http.post<any>(`${this.apiRoot}/proj/create`, formData, { headers });
  }
}