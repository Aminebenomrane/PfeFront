import { Role } from "./role";

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  nomEntreprise:string;
  role?: Role;
  numTel : string;
  pays:string;
  siteweb:string;
 
  
}