import { Component } from '@angular/core';

@Component({
  selector: 'app-freelancer-home',
  templateUrl: './freelancer-home.component.html',
  styleUrls: ['./freelancer-home.component.scss']
})
export class FreelancerHomeComponent {
  sideBarOpen = true;
  
 
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
