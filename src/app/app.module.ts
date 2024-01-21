import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

// Angular Material Imports
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FindJobComponent } from './find-job/find-job.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
// Third-party Imports
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap/timepicker'; // Import the TimepickerModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DemandeOffreComponent } from './freelancer/demande-offre/demande-offre.component';
import { Sidenav1Component } from './sidenav1/sidenav1.component';
import { DemandeProjetComponent } from './entreprise/demande-projet/demande-projet.component';
import { OffreComponent } from './freelancer/offre/offre.component';
import { EntrepriseComponent } from './entreprise/entreprise/entreprise.component';
import { ProjetComponent } from './entreprise/projet/projet.component';
import { AddEditOffreComponent } from './freelancer/offre/add-edit-offre/add-edit-offre.component';
import { AddEditProjetComponent } from './entreprise/projet/add-edit-projet/add-edit-projet.component';
import { Navbar1Component } from './navbar1/navbar1.component';
import { FreelancerHomeComponent } from './freelancer/freelancer-home/freelancer-home.component';
import { ChatComponent } from './entreprise/chat/chat.component';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { ChatFComponent } from './freelancer/chat-f/chat-f.component';
import { SuiviOffreComponent } from './freelancer/suivi-offre/suivi-offre.component';
import { SuiviProjetComponent } from './entreprise/suivi-projet/suivi-projet.component';
import { CreateIssueDialogComponent } from './entreprise/create-issue-dialog/create-issue-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MesprojetsComponent } from './freelancer/mesprojets/mesprojets.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    NavbarComponent,
    FindJobComponent,
    JobDetailsComponent,
    LoginComponent,
    SidenavComponent,
    HeaderComponent,
    HomeComponent,
    DemandeOffreComponent,
    Sidenav1Component,
    DemandeProjetComponent,
    OffreComponent,
    EntrepriseComponent,
    ProjetComponent,
    AddEditOffreComponent,
    AddEditProjetComponent,
    Navbar1Component,
    FreelancerHomeComponent,
    ChatComponent,
    ChatFComponent,
    SuiviOffreComponent,
    SuiviProjetComponent,
    CreateIssueDialogComponent,
    MesprojetsComponent
  ],
  imports: [
    NgxChartsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatDatepickerModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    MatPaginatorModule,
    MatListModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    NgbModalModule, TimepickerModule.forRoot(),


    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['*'], // Replace with your domain
        disallowedRoutes: [] // Replace with your API URL
      }
    })
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },

    StompService,
    {
      provide: StompConfig,
      useValue: {
        url: 'ws://localhost:8080/ws',
        headers: {},
        heartbeat_in: 0,
        heartbeat_out: 20000,
        reconnect_delay: 5000,
        debug: true,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
