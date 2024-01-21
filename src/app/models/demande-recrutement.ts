import { Offre } from "./offre";
import { User } from "./user";

export interface DemandeRecrutement {
    id: number;
  entreprise?:User;
  offre?: Offre;
  date_demande?: Date;
  etatD?: string; //
  
}
