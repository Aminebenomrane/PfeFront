import { TicketStatus } from "./TicketStatus";
import { User } from "./user";

export interface Ticket {
  id: number;
  summary: string;
  status: TicketStatus; // Utilisez l'enum TicketStatus ici
  lastUpdated: string;
  assignedTo: any;
  createdBy: any;

}
