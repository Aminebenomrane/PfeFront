import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandeRealisation } from '../models/demande-realisation';

@Injectable({
  providedIn: 'root'
})
export class DemandeProjetService {
  private apiRoot = 'http://localhost:8080/api/v1'; 

  constructor(private http: HttpClient) {}

  createDemandeRealisation(demandeRealisation: DemandeRealisation): Observable<DemandeRealisation> {
    return this.http.post<DemandeRealisation>(`${this.apiRoot}/demandeF/create`, demandeRealisation);
  }

  validerDemandeRealisation(id: number): Observable<DemandeRealisation> {
    return this.http.put<DemandeRealisation>(`${this.apiRoot}/valider/${id}`, null);
  }

  annulerDemandeRealisation(id: number): Observable<DemandeRealisation> {
    return this.http.put<DemandeRealisation>(`${this.apiRoot}/annuler/${id}`, null);
  }

  findById(id: number): Observable<DemandeRealisation> {
    return this.http.get<DemandeRealisation>(`${this.apiRoot}/${id}`);
  }

  findAll(): Observable<DemandeRealisation[]> {
    return this.http.get<DemandeRealisation[]>(`${this.apiRoot}/all`);
  }

  findAllValidDemande(idfreelancer: number): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.apiRoot}/demandeF/valid/${idfreelancer}`);
  }

  findAllEnCours(): Observable<DemandeRealisation[]> {
    return this.http.get<DemandeRealisation[]>(`${this.apiRoot}/demandeF/encours/All`);
  }

  findAllAnnuler(): Observable<DemandeRealisation[]> {
    return this.http.get<DemandeRealisation[]>(`${this.apiRoot}/demandeF/annuler/All`);
  }

  findAllValider(): Observable<DemandeRealisation[]> {
    return this.http.get<DemandeRealisation[]>(`${this.apiRoot}/demandeF/valider/All`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiRoot}/${id}`);
  }
}