// Dans votre service (offre.service.ts)
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Offre } from '../models/offre';
import { DomaineExpertise } from '../models/domaine-expertise';
import { Technologie } from '../models/technologie';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class OffreService {
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  ajouterUneOffre(offre: Offre): Observable<Offre> {
    return this.http.post<Offre>(`${this.apiUrl}/offer/create`, offre);
  }

  supprimerUneOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/offer/${id}`);
  }

  updateUneOffre(offre: Offre, id: number): Observable<Offre> {
    return this.http.put<Offre>(`${this.apiUrl}/offer/${id}`, offre);
  }

  getOffreById(id: number): Observable<Offre> {
    return this.http.get<Offre>(`${this.apiUrl}/offer/${id}`);
  }

  getOffreByUserId(id: number): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/offer/user/${id}`);
  }

  tousLesOffres(page: number = 0, size: number = 4): Observable<Offre[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Offre[]>(`${this.apiUrl}/offer/pagination/All`, { params });
  }


  rechercherOffresParDomaineEtTechnologie(domaine: DomaineExpertise, technologie: Technologie): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.apiUrl}/offer/recherche/${domaine}/${technologie}`);
  }

  findAll(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/offer/All`);
  }


  tousLesOffresProjets(page: number = 0, size: number = 4): Observable<any[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any[]>(`${this.apiUrl}/offres-et-projets`, { params });
  }


  

 


  addOffer(offer: any, imageFiles: File[]): Observable<any> {
    const formData: FormData = new FormData();

    // Append offer data as a JSON string
    formData.append(
      'offre',
      new Blob([JSON.stringify(offer)], { type: 'application/json' }))

    // Append each image file
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('imageFile', imageFiles[i], imageFiles[i].name);
    }

    const headers = new HttpHeaders();
    // Note: Do not set the Content-Type header; HttpClient will set it automatically for FormData.

    return this.http.post<any>(`${this.apiUrl}/offer/create`, formData, { headers });
  }
}