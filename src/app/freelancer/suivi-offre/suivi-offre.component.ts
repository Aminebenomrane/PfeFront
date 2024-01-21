import { Component, OnInit } from '@angular/core';

import { TicketService } from 'src/app/services/ticket.service';
export enum TicketStatus {
  TO_DO,
  IN_PROGRESS,
  DONE,
}

export interface Ticket {
  id: number;
  summary: string;
  status: TicketStatus;
  lastUpdated: string;
  assignedTo: any;
  createdBy: any;
}
@Component({
  selector: 'app-suivi-offre',
  templateUrl: './suivi-offre.component.html',
  styleUrls: ['./suivi-offre.component.scss']
})
export class SuiviOffreComponent implements OnInit {

  sideBarOpen = true;
  id_user!: number;
  ticketStatusArray = Object.values(TicketStatus);

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  pageSize = 3; 
  currentPage = 1; 
  tickets: Ticket[] = [];
  TicketStatus = TicketStatus;
  todoTickets: Ticket[] = [];
  inProgressTickets: Ticket[] = [];
  doneTickets: Ticket[] = [];
  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.id_user = user.id;
      this.loadTickets();
    }
  }

  loadTickets() {
    this.ticketService.getTicketsByUserId(this.id_user).subscribe(
      (tickets) => {
        this.tickets = tickets;
        console.log('Tickets loaded successfully:', this.tickets);

        this.todoTickets = this.getTicketsByStatus(TicketStatus.TO_DO);
        this.inProgressTickets = this.getTicketsByStatus(TicketStatus.IN_PROGRESS);
        this.doneTickets = this.getTicketsByStatus(TicketStatus.DONE);

        this.updatePagination();
      },
      (error) => {
        console.error('Erreur lors du chargement des tickets:', error);
      }
    );
  }

getTicketsByStatus(status: TicketStatus): Ticket[] {
  console.log('Requested status:', status);

  const filteredTickets = this.tickets.filter((ticket) => {
    if (typeof ticket.status === 'string') {
      return ticket.status === TicketStatus[status]; // Use enum name to compare
    }
    return false;
  });

  console.log('Filtered tickets:', filteredTickets);

  return filteredTickets;
}

onDragStart(event: any, ticket: Ticket) {
  event.dataTransfer.setData('text/plain', ticket.id.toString());
}

onDragOver(event: any) {
  event.preventDefault();
  console.log('onDragOver called');
}

onDragEnter(event: any) {
  event.preventDefault();
  console.log('onDragEnter called');
}

onDrop(event: any, status: string) {
  event.preventDefault();
  const ticketId: number = +event.dataTransfer.getData('text/plain');
  console.log('onDrop called with ticketId:', ticketId, 'and status:', status);

  const statusEnum: TicketStatus = TicketStatus[status as keyof typeof TicketStatus];

  if (statusEnum !== undefined) {
    console.log('Valid status:', statusEnum);
    this.ticketService.updateTicketWorkflowStatus(ticketId, statusEnum).subscribe(
      (updatedTicket) => {
        this.loadTickets();
        console.log('Ticket status updated successfully:', updatedTicket);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'état du ticket:', error);
      }
    );
  } else {
    console.error('Erreur: status invalide');
  }
}

updatePagination() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;

  this.todoTickets = this.getTicketsByStatus(TicketStatus.TO_DO).slice(startIndex, endIndex);
  this.inProgressTickets = this.getTicketsByStatus(TicketStatus.IN_PROGRESS).slice(startIndex, endIndex);
  this.doneTickets = this.getTicketsByStatus(TicketStatus.DONE).slice(startIndex, endIndex);
}

onPageChange(page: number) {
  this.currentPage = page;
  this.updatePagination();
}
  
  
}