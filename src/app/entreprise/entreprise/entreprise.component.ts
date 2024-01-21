import { Component } from '@angular/core';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss']
})
export class EntrepriseComponent {
  sideBarOpen = true;
 
  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
