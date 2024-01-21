import { DomaineExpertise } from "./domaine-expertise";
import { ProductImages } from "./product-images";
import { Technologie } from "./technologie";
import { User } from "./user";

export interface Projet {

    id: number;
    titre?: string;
    place?: string;
    description?: string;
    domaineExpertise?: DomaineExpertise;
    technologie?: Technologie;
    imageUrl?: string;
    budget?: number;
    duree?: number;
    postDate?: Date;
    nombreDePostesVacants?:number;
    experience?:string;
    natureDuTravail?:string;
    statusProjet?: string;
    entreprise?: User;
    productImages?:ProductImages[];
}
