import { SafeUrl } from "@angular/platform-browser";

export interface ProductImages {

    id:number;
    name:string;
    type?:string;
    picByte?:string;
    file: File;
 url?:SafeUrl;
}
