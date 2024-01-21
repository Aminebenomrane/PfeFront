import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../models/Ticket';
import { Observable } from 'rxjs';
import { TicketStatus } from '../models/TicketStatus';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:8080/api/v1/tickets';

  constructor(private http: HttpClient) {}

 
  getTicketsByUserId(userId: number): Observable<Ticket[]> {
    const url = `${this.apiUrl}/byUser/${userId}`;
    return this.http.get<Ticket[]>(url);
  }

  updateTicketWorkflowStatus(ticketId: number, newStatus: TicketStatus): Observable<Ticket> {
    const url = `${this.apiUrl}/${ticketId}/update-status`;
    const params = new HttpParams().set('newStatus', newStatus.toString());
    return this.http.put<Ticket>(url, null, { params });
  }
  createTicket(ticket: any): Observable<Ticket> {
    const url = `${this.apiUrl}/create`;
    return this.http.post<Ticket>(url, ticket);
  }

}