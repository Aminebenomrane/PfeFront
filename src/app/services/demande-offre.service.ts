import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandeRecrutement } from '../models/demande-recrutement';


const apiRoot = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class DemandeRecrutementService {
  constructor(private http: HttpClient) {}

  createDemandeRecrutement(demandeRecrutement: DemandeRecrutement): Observable<DemandeRecrutement> {
    return this.http.post<DemandeRecrutement>(`${apiRoot}/demandeRec/create`, demandeRecrutement);
  }

  validerDemandeRecrutement(id: number): Observable<DemandeRecrutement> {
    return this.http.put<DemandeRecrutement>(`${apiRoot}/validerRec/${id}`, {});
  }

  annulerDemandeRecrutement(id: number): Observable<DemandeRecrutement> {
    return this.http.put<DemandeRecrutement>(`${apiRoot}/annulerRec/${id}`, {});
  }

  findById(id: number): Observable<DemandeRecrutement> {
    return this.http.get<DemandeRecrutement>(`${apiRoot}/deleteRec/${id}`);
  }

  findAll(): Observable<DemandeRecrutement[]> {
    return this.http.get<DemandeRecrutement[]>(`${apiRoot}/demandeRec/all`);
  }

  findAllValidDemande(iden: number): Observable<Object[]> {
    return this.http.get<Object[]>(`${apiRoot}/demandeRec/valid/${iden}`);
  }

  findAllEnCours(): Observable<DemandeRecrutement[]> {
    return this.http.get<DemandeRecrutement[]>(`${apiRoot}/demandeRec/encours/All`);
  }

  findAllAnnuler(): Observable<DemandeRecrutement[]> {
    return this.http.get<DemandeRecrutement[]>(`${apiRoot}/demandeRec/annuler/All`);
  }

  findAllValider(): Observable<DemandeRecrutement[]> {
    return this.http.get<DemandeRecrutement[]>(`${apiRoot}/demandeRec/valider/All`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${apiRoot}/deleteRec/${id}`);
  }
}