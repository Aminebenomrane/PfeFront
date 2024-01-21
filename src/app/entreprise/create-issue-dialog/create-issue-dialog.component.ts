import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { DemandeProjetService } from 'src/app/services/demande-projet.service';
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
  selector: 'app-create-issue-dialog',
  templateUrl: './create-issue-dialog.component.html',
  styleUrls: ['./create-issue-dialog.component.scss']
})
export class CreateIssueDialogComponent implements OnInit{

  id_user!: number;
  selectedStatus: TicketStatus = TicketStatus.TO_DO;
  summary: string = '';
  selectedAssignee: any = null;
  statuses = Object.values(TicketStatus);
  assignedUsers: any[] = [];
  currentDate: string = '';

  constructor(public dialogRef: MatDialogRef<CreateIssueDialogComponent> , private ticketService: TicketService ,private projetService  :DemandeProjetService , private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.id_user = user.id;

      this.projetService.findAllValider().subscribe(
        (projets: any[]) => {

          console.log('Projets validés :', projets);


          if (projets.length > 0) {

            this.assignedUsers = [];

            projets.forEach(projet => {
              const userId = projet.freelancer.id;
              const userName = `${projet.freelancer.firstname} ${projet.freelancer.lastname}`;


              if (!this.assignedUsers.some(user => user.id === userId)) {
                this.assignedUsers.push({ id: userId, name: userName });
              }
            });


            console.log('Utilisateurs assignés :', this.assignedUsers);
          } else {
            console.warn('Aucun projet validé trouvé.');
          }
        },
        error => {
          console.error('Erreur lors de la récupération des projets validés :', error);

        }
      );
    }
    this.currentDate = new Date().toISOString();

  }


  onCreate(): void {
    if (this.assignedUsers.length > 0) {
      const newTicket = {
        summary: this.summary,
        status: TicketStatus[this.selectedStatus],
        createdBy: { id: this.id_user },
        assignedTo: { id: this.assignedUsers[0].id },
        lastUpdated: this.currentDate,
      };

      this.ticketService.createTicket(newTicket).subscribe(
        createdTicket => {
          console.log('Ticket créé avec succès :', createdTicket);
          const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('Ticket créé avec succès', 'OK', {
            duration: 3000,
          });

          snackBarRef.afterDismissed().subscribe(() => {
            this.dialogRef.close('create');
            window.location.reload();
          });
        },
        error => {
          console.error('Erreur lors de la création du ticket :', error);
        }
      );
    } else {
      console.warn('Aucun utilisateur assigné trouvé.');
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }
}
