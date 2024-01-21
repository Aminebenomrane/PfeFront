import { Projet } from "./projet";
import { User } from "./user";

export interface DemandeRealisation {
    id: number;
    freelancer?: User;
    projet?: Projet;
    date_demande?: Date;
    etatD?: string;
}
