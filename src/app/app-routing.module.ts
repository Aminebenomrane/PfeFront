import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FindJobComponent } from './find-job/find-job.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import  {LoginComponent} from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { DemandeOffreComponent } from './freelancer/demande-offre/demande-offre.component';
import { DemandeProjetComponent } from './entreprise/demande-projet/demande-projet.component';
import { OffreComponent } from './freelancer/offre/offre.component';
import { EntrepriseComponent } from './entreprise/entreprise/entreprise.component';
import { ProjetComponent } from './entreprise/projet/projet.component';
import { FreelancerHomeComponent } from './freelancer/freelancer-home/freelancer-home.component';
import { ChatComponent } from './entreprise/chat/chat.component';
import { ChatFComponent } from './freelancer/chat-f/chat-f.component';
import { SuiviOffreComponent } from './freelancer/suivi-offre/suivi-offre.component';
import { SuiviProjetComponent } from './entreprise/suivi-projet/suivi-projet.component';
import { MesprojetsComponent } from './freelancer/mesprojets/mesprojets.component';

const routes: Routes = [
  { path: 'freelancer/home', component: FreelancerHomeComponent},
  { path: 'entreprise/home', component: EntrepriseComponent },
  { path: 'freelancer/offre', component: OffreComponent },
  { path: 'entreprise/projet', component: ProjetComponent },
  { path: 'entreprise/demande-projet', component: DemandeProjetComponent },
  { path: 'freelancer/demande-offre', component: DemandeOffreComponent },
  { path: 'test', component: HomeComponent },
  { path: 'home', component: AccueilComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'findJob', component: FindJobComponent },
  { path: 'jobDetails/:id/:type', component: JobDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'entreprise/chat', component: ChatComponent },
  { path: 'freelancer/chat', component: ChatFComponent },
  { path: 'freelancer/suiviOffre', component: SuiviOffreComponent },
  { path: 'entreprise/suiviProjet', component: SuiviProjetComponent },
  { path: 'freelancer/mesprojets', component: MesprojetsComponent },

  // Add more routes as needed
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/home' }, // Wildcard route for 404


];

@NgModule({
  imports: [    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
],
  exports: [RouterModule]
})




export class AppRoutingModule { }
